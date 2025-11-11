import { Link, useGlobalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { useAssessments } from "../assessments.hooks";

const AssessmentList = () => {
  const { id } = useGlobalSearchParams();
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useAssessments(id as string);

  if (isLoading && !data) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  const assessments = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && assessments.length === 0)
    return <Text>No assessments found.</Text>;

  return (
    <FlatList
      data={assessments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Link href={`/assessment/${item.id}`}>
          <Text>{item.activity_name}</Text>
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
    />
  );
};

export default AssessmentList;
