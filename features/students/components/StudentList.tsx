import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useStudents } from "../students.hooks";

const StudentList = () => {
  const { id } = useGlobalSearchParams();
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useStudents(id as string);

  if (isLoading) return <Text>Loading....</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  const students = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && students.length === 0)
    return <Text>No students found.</Text>;

  return (
    <View>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default StudentList;
