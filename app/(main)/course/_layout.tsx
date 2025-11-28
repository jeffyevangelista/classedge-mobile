import BackButton from "@/components/back-button";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const CourseLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: "#000",
        },
        headerTintColor: "#2287d5",
        headerShadowVisible: false,
        headerLeft: ({ tintColor }) => <BackButton tintColor={tintColor} />,
      }}
    >
      <Stack.Screen
        name="[courseId]"
        options={{
          headerShown: false,
          headerLeft:
            Platform.OS === "ios"
              ? ({ tintColor }) => <BackButton tintColor={tintColor} />
              : undefined,
        }}
      />
      <Stack.Screen
        name="course-details"
        options={{
          headerTitle: "Course Details",
          headerStyle: {
            backgroundColor: "#f9f9f9",
          },
        }}
      />
    </Stack>
  );
};

export default CourseLayout;
