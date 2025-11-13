import ErrorFallback from "@/components/error-fallback";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { useTabScrollContext } from "@/contexts/TabScrollContext";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { Link, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import { DocumentTextIcon } from "react-native-heroicons/outline";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useMaterials } from "../materials.hooks";
import { Material } from "../materials.types";

const MaterialList = () => {
  const { id } = useGlobalSearchParams();
  const { scrollY } = useTabScrollContext();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMaterials(id as string);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  if (isLoading && !data) return <MaterialsSkeleton />;
  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={() => refetch()}
        isRefetching={isRefetching}
      />
    );

  const materials = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && materials.length === 0)
    return <Text>No materials found.</Text>;

  return (
    <Animated.FlatList
      data={materials}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MaterialItem {...item} />}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingTop: 16 }}
    />
  );
};

const getLessonIcon = (lessonType: string) => {
  const iconMap = {
    document: {
      label: "Material",
    },
    external_link: {
      label: "Link",
    },
    embedded_content: {
      label: "Sway",
    },
  };
  return iconMap[lessonType as keyof typeof iconMap] || iconMap.document;
};

const MaterialItem = ({
  id,
  lesson_name,
  lesson_type,
  start_date,
}: Material) => {
  const { label } = getLessonIcon(lesson_type);

  const formattedDate = start_date ? useFormattedDate(start_date) : null;
  return (
    <Link
      className="max-w-screen-xl mx-auto w-full mt-2.5"
      href={`/material/${id}`}
    >
      <Card className="rounded-xl flex-row items-center">
        <HStack space="md" className="flex-1">
          <Box className={`p-2.5 bg-purple-50 rounded-full`}>
            <Icon
              className={`h-6 w-6 text-purple-600 `}
              as={DocumentTextIcon}
            />
          </Box>

          <VStack className="flex-1">
            <Text
              className="text-neutral-900 font-poppins-semibold text-lg flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {label}: {lesson_name}
            </Text>
            <Text
              className="text-neutral-500 text-xs"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Posted {formattedDate}
            </Text>
          </VStack>
        </HStack>
      </Card>
    </Link>
  );
};

const MaterialsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className="rounded-lg mb-2.5 flex-row max-w-screen-md mx-auto w-full gap-2.5 items-center"
        >
          <HStack space="md" className="flex-1">
            <Skeleton speed={1} className="rounded-md h-16 w-16" />

            <VStack className="flex-1" space="sm">
              <SkeletonText speed={4} _lines={2} className="h-5 rounded-full" />
              <SkeletonText speed={3} className="h-3 w-24 rounded-full" />
            </VStack>
          </HStack>
        </Card>
      ))}
    </>
  );
};

export default MaterialList;
