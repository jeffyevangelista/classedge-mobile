import { Link } from "expo-router";
import React from "react";
import { FlatList, Text } from "react-native";
import { useCourses } from "../course.hooks";

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
      renderItem={({ item }) => (
        <Link href={`/subject/${item.id}`}>
          <Text>{item.subject_name}</Text>
        </Link>
      )}
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

export default CourseList;
