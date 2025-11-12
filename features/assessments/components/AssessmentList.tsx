import { useTabScrollContext } from "@/contexts/TabScrollContext";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Text } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useAssessments } from "../assessments.hooks";
import AssessmentItem from "./Assessment";

const AssessmentList = () => {
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
  } = useAssessments(id as string);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  if (isLoading && !data) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  const assessments = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && assessments.length === 0)
    return <Text>No assessments found.</Text>;

  return (
    <Animated.FlatList
      data={assessments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AssessmentItem {...item} />}
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

export default AssessmentList;
