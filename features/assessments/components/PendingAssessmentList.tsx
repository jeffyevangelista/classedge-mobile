import ErrorFallback from "@/components/error-fallback";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
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

  if (isLoading) return <ActivityIndicator />;

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
          <Icon as={CheckCircleIcon} className="h-6 w-6 text-green-600" />
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
};

export default PendingAssessmentList;
