import React from "react";
import { FlatList, Text } from "react-native";
import { usePendingAssessments } from "../assessments.hooks";
import AssessmentItem from "./Assessment";

const PendingAssessmentList = () => {
  const { data, isLoading, isError, error } = usePendingAssessments();
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

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
