import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { InformationCircleIcon } from "react-native-heroicons/outline";

const CourseLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: "#000",
        },
        headerTintColor: "#2287d5",
        headerShadowVisible: false,
        // headerLeft:
        //   Platform.OS === "ios"
        //     ? ({ tintColor }) => <BackButton tintColor={tintColor} />
        //     : undefined,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          // headerLeft:
          //   Platform.OS === "ios"
          //     ? ({ tintColor }) => (
          //         <BackButton
          //           to="/(root)/(protected)/(tabs)/courses/"
          //           tintColor={tintColor}
          //         />
          //       )
          //     : undefined,
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
