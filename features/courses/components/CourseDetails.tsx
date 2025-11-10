import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useCourse } from "../courses.hooks";

const CourseDetails = () => {
  const { id } = useGlobalSearchParams();
  const { isLoading, data, isError, error } = useCourse(id as string);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <Text>{data?.subject_name}</Text>
      <Text>{data?.subject_code}</Text>
      <Text>{data?.subject_description}</Text>
      <Text>{data?.subject_photo}</Text>
      <Text>{data?.teacher_name}</Text>
      <Text>{data?.teacher_email}</Text>
      <Text>{data?.teacher_photo}</Text>
      <Text>{data?.room_number}</Text>
    </View>
  );
};

export default CourseDetails;
