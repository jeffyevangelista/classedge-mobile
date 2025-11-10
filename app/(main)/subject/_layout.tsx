import { Stack } from "expo-router";
import React from "react";

const SubjectLayout = () => {
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
          headerTitle: "Subjects",
          headerStyle: {
            backgroundColor: "#f9f9f9",
          },
        }}
      />
      <Stack.Screen
        name="subject-details"
        options={{
          headerTitle: "Subject Details",
          headerStyle: {
            backgroundColor: "#f9f9f9",
          },
        }}
      />
    </Stack>
  );
};

export default SubjectLayout;
