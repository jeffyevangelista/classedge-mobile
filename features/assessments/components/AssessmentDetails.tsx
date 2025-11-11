import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useAssessment } from "../assessments.hooks";

const AssessmentDetails = () => {
  const { id } = useGlobalSearchParams();
  const { isLoading, isError, error, data } = useAssessment(id as string);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default AssessmentDetails;
