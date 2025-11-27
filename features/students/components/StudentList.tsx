import ErrorFallback from "@/components/error-fallback";
import NoDataFallback from "@/components/no-data-fallback";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { useStudents } from "../students.hooks";
import { Student } from "../students.types";

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

  if (isLoading) return <ActivityIndicator />;
  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  const students = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && students.length === 0)
    return (
      <NoDataFallback isRefetching={isRefetching} refetch={() => refetch()} />
    );

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <StudentItem {...item} />}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingTop: 16 }}
    />
  );
};

const StudentItem = ({ name, student_photo }: Student) => {
  return (
    <Card className="mt-2.5 w-full max-w-screen-xl mx-auto">
      <HStack space={"md"} className="items-center">
        <Avatar size="md">
          <AvatarFallbackText>{name}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: student_photo,
            }}
          />
        </Avatar>
        <Text className="text-neutral-900 font-poppins-regular text-lg flex-1">
          {name}
        </Text>
      </HStack>
    </Card>
  );
};

export default StudentList;
