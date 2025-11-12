import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { useTabScrollContext } from "@/contexts/TabScrollContext";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Text } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useStudents } from "../students.hooks";
import { Student } from "../students.types";

const StudentList = () => {
  const { id } = useGlobalSearchParams();
  const { scrollY } = useTabScrollContext();
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  if (isLoading) return <Text>Loading....</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  const students = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && students.length === 0)
    return <Text>No students found.</Text>;

  return (
    <Animated.FlatList
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
      onScroll={scrollHandler}
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
