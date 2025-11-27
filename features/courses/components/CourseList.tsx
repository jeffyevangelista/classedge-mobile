import ErrorFallback from "@/components/error-fallback";
import NoDataFallback from "@/components/no-data-fallback";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
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

  if (isLoading) return <CoursesSkeleton />;
  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={() => refetch()}
        isRefetching={isRefetching}
      />
    );

  const courses = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && courses.length === 0)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

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
      ListFooterComponent={isFetchingNextPage ? <CoursesSkeleton /> : null}
    />
  );
};

const Subject = ({
  id,
  room_number,
  subject_name,
  subject_photo,
  teacher_name,
}: Course) => {
  return (
    <Link href={`/course/${id}`} asChild>
      <Pressable className="w-full max-w-screen-md mx-auto">
        <Card className="border-2 border-neutral-100  mb-2.5 rounded-3xl p-0 overflow-hidden">
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

const CoursesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className="shadow mb-5 rounded-lg p-0 overflow-hidden w-full max-w-screen-md mx-auto"
        >
          <Box className="relative h-40 w-full">
            <Skeleton speed={4} className="object-cover w-full h-full" />
          </Box>
          <Box className="p-4 gap-4">
            <Box className="gap-2">
              <SkeletonText
                speed={3}
                className={
                  "rounded-full h-6 w-full text-slate-900 font-semibold"
                }
              />
              <SkeletonText
                speed={2}
                className="rounded-full h-2 w-24 text-typography-500"
              />
            </Box>

            <HStack space="md">
              <Skeleton speed={4} className="rounded-full w-12 h-12" />
              <SkeletonText
                speed={3}
                className="rounded-full h-3 w-24 my-auto"
              />
            </HStack>
          </Box>
        </Card>
      ))}
    </>
  );
};

export default CourseList;
