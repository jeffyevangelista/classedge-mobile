import ErrorFallback from "@/components/error-fallback";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { usePendingAssessments } from "../assessments.hooks";
import AssessmentItem from "./Assessment";

const PendingAssessmentList = () => {
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
  } = usePendingAssessments();

  if (isLoading) return <AssessmentSkeleton />;

  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  const assessments = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && assessments.length === 0)
    return (
      <Box className="items-center justify-center py-6">
        <Box className="bg-green-100 p-3 rounded-full mb-2">
          <Icon as={CheckCircleIcon} className="h-6 w-6 text-neutral-600" />
        </Box>
        <Text className="text-neutral-600 font-poppins-medium text-sm">
          All caught up!
        </Text>
        <Text className="text-neutral-400 font-poppins-regular text-xs">
          No pending submissions
        </Text>
      </Box>
    );

  return (
    <FlatList
      data={assessments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AssessmentItem {...item} />}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      scrollEnabled={false}
    />
  );
  // return <AssessmentSkeleton />;
};

export const AssessmentSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className="rounded-lg mb-2.5 flex-row max-w-screen-xl mx-auto w-full gap-2.5 items-center"
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

export default PendingAssessmentList;
