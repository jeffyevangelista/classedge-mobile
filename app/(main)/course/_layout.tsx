import BackButton from "@/components/back-button";
import { Pressable } from "@/components/ui/pressable";
import { useCourse } from "@/features/courses/courses.hooks";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { InformationCircleIcon } from "react-native-heroicons/outline";

const CourseLayout = () => {
  const router = useRouter();
  const { courseId } = useLocalSearchParams();
  const { data, isLoading } = useCourse(courseId as string);
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
          headerTitle: isLoading
            ? "loading"
            : !isLoading && data
            ? data.subject_name
            : "",
          headerLeft:
            Platform.OS === "ios"
              ? ({ tintColor }) => <BackButton tintColor={tintColor} />
              : undefined,
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/course/course-details")}
              className="w-10 h-10 rounded-full flex justify-center items-center"
            >
              <InformationCircleIcon color={"#2287d5"} size={28} />
            </Pressable>
          ),
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
