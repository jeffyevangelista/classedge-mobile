import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { InformationCircleIcon } from "react-native-heroicons/outline";

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
          // headerLeft:
          //   Platform.OS === "ios"
          //     ? ({ tintColor }) => (
          //         <BackButton
          //           to="/(root)/(protected)/(tabs)/subjects/"
          //           tintColor={tintColor}
          //         />
          //       )
          //     : undefined,
          headerRight: ({ tintColor }) => {
            const router = useRouter();
            return (
              <Pressable
                onPress={() => {
                  router.push("/subject/subject-details");
                }}
                className=" w-10 h-10 rounded-full flex justify-center items-center"
              >
                <InformationCircleIcon color={tintColor} size={28} />
              </Pressable>
            );
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
