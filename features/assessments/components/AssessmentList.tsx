import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { useTabScrollContext } from "@/contexts/TabScrollContext";

import ErrorFallback from "@/components/error-fallback";
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

  if (isLoading) return <AssessmentSkeleton />;
  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

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

const AssessmentSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className="rounded-lg mb-2.5 flex-row max-w-screen-md mx-auto w-full gap-2.5 items-center"
        >
          <HStack space="md" className="flex-1">
            <Skeleton speed={1} className="rounded-md h-16 w-16" />
            <VStack className="flex-1" space="sm">
              <SkeletonText speed={4} _lines={2} className="h-5 rounded-full" />
              <SkeletonText speed={3} className="h-3 w-24 rounded-full" />
            </VStack>
          </HStack>
        </Card>
      ))}
    </>
  );
};

export default AssessmentList;
