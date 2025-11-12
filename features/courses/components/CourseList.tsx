import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text } from "react-native";
import { useCourses } from "../courses.hooks";
import { Course } from "../courses.types";

const CourseList = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useCourses();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  const courses = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <FlatList
      data={courses}
      renderItem={({ item }) => <Subject {...item} />}
      onRefresh={refetch}
      refreshing={isRefetching}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <Text>Loading...</Text> : null}
    />
  );
};

const Subject = ({
  id,
  room_number,
  subject_code,
  subject_description,
  subject_name,
  subject_photo,
  teacher_email,
  teacher_name,
  teacher_photo,
}: Course) => {
  return (
    <Link href={`/course/${id}`} asChild>
      <Pressable className="w-full max-w-screen-md mx-auto">
        <Card className="border-2 border-neutral-100  mb-5 rounded-3xl p-0 overflow-hidden">
          <Box className="relative h-40 w-full">
            <Image
              source={
                subject_photo
                  ? { uri: subject_photo }
                  : require("@/assets/images/woocommerce-placeholder.png")
              }
              alt={subject_name}
              className="object-cover w-full h-full"
            />
          </Box>
          <Box className="p-4 gap-4">
            <Box>
              <Heading
                className={"text-slate-900 font-semibold"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {subject_name}
              </Heading>
              <Text className="text-typography-500">
                {room_number} · {teacher_name}
              </Text>
            </Box>
          </Box>
        </Card>
      </Pressable>
    </Link>
  );
};

export default CourseList;
