import ErrorFallback from "@/components/error-fallback";
import FileRenderer from "@/components/file-renderer";
import NoDataFallback from "@/components/no-data-fallback";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import { useMaterial } from "../materials.hooks";

const MaterialDetails = () => {
  const { materialId } = useGlobalSearchParams();
  const { isLoading, isError, error, data, refetch, isRefetching } =
    useMaterial(materialId as string);

  const formattedDate = data?.start_date
    ? useFormattedDate(data.start_date)
    : null;

  if (isLoading)
    return (
      <MaterialSkeleton isRefetching={isRefetching} refetch={() => refetch()} />
    );

  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={() => refetch()}
        isRefetching={isRefetching}
      />
    );

  if (!data)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      showsVerticalScrollIndicator={false}
    >
      <Box className="gap-10 w-full max-w-screen-md mx-auto">
        <VStack>
          <Text>{formattedDate || "Date not available"}</Text>
          <Heading size={"2xl"}>{data.lesson_name}</Heading>
        </VStack>
        <Text className="text-justify">{data.lesson_description}</Text>

        <VStack className="gap-2">
          <Text>Attachments</Text>
          {(data.lesson_file || data.lesson_url) && <FileRenderer url={data} />}
        </VStack>
      </Box>
    </ScrollView>
  );
};

const MaterialSkeleton = ({
  isRefetching,
  refetch,
}: {
  isRefetching: boolean;
  refetch: () => void;
}) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      className="w-full max-w-screen-md mx-auto h-full gap-10"
    >
      <Box className="gap-2">
        <SkeletonText _lines={1} speed={4} className="rounded-full h-2 w-20" />
        <SkeletonText
          _lines={1}
          speed={3}
          className="rounded-full h-5 w-full"
        />
        <SkeletonText _lines={1} speed={2} className="rounded-full h-2 w-20" />
      </Box>

      <SkeletonText _lines={10} speed={4} className="rounded-full h-3" />

      <Box className="gap-2">
        <SkeletonText _lines={1} speed={1} className="rounded-full h-2 w-20" />

        <Skeleton speed={4} className="rounded-lg h-32 w-full" />
        <Skeleton speed={3} className="rounded-lg h-32 w-full" />
        <Skeleton speed={2} className="rounded-lg h-32 w-full" />
        <Skeleton speed={4} className="rounded-lg h-32 w-full" />
      </Box>
    </ScrollView>
  );
};

export default MaterialDetails;
