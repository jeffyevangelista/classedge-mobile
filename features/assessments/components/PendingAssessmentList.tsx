import ErrorFallback from "@/components/error-fallback";
import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { usePendingAssessments } from "../assessments.hooks";
import AssessmentItem from "./Assessment";

const PendingAssessmentList = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    usePendingAssessments();
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
    return <Text>No assessments found.</Text>;

  return (
    <FlatList
      data={assessments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AssessmentItem {...item} />}
    />
  );
};

export default PendingAssessmentList;
