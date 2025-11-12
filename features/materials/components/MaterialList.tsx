import { useTabScrollContext } from "@/contexts/TabScrollContext";
import { Link, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useMaterials } from "../materials.hooks";

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

  if (isLoading && !data) return <ActivityIndicator />;
  if (isError) return <Text>{error.message}</Text>;

  const materials = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && materials.length === 0)
    return <Text>No materials found.</Text>;

  return (
    <Animated.FlatList
      data={materials}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Link
          className="border mb-80 py-80"
          href={`/material/${item.id}`}
          asChild
        >
          <Text>{item.lesson_name}</Text>
        </Link>
      )}
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

export default MaterialList;
