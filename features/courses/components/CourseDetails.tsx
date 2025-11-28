import ErrorFallback from "@/components/error-fallback";
import NoDataFallback from "@/components/no-data-fallback";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useCourse } from "../courses.hooks";

const CourseDetails = () => {
  const { courseId } = useGlobalSearchParams();
  const { isLoading, data, isError, error, refetch, isRefetching } = useCourse(
    courseId as string
  );

  if (isLoading)
    return <CourseDetailSkeleton isRefetching={false} refetch={() => {}} />;

  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  if (!data)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <Box className="w-full mx-auto max-w-screen-md p-6 pb-20 gap-8">
        {/* --- Cover Image --- */}
        <Image
          source={
            data.subject_photo
              ? { uri: data.subject_photo }
              : require("@/assets/images/woocommerce-placeholder.png")
          }
          alt="Cover"
          className="w-full rounded-xl h-48 object-cover"
        />

        {/* --- Main Course Info --- */}
        <Box className="gap-2">
          <Heading className="text-2xl font-bold">{data.subject_name}</Heading>

          <Text className="text-base text-gray-600">
            {data.subject_code} • Room {data.room_number}
          </Text>
        </Box>

        {/* Divider */}
        <View className="h-[1px] bg-gray-200" />

        {/* --- Description --- */}
        {data.subject_description ? (
          <Box className="gap-2">
            <Heading className="text-lg font-semibold">Description</Heading>
            <Text className="text-base leading-6 text-gray-700">
              {data.subject_description}
            </Text>
          </Box>
        ) : null}

        {/* Divider */}
        <View className="h-[1px] bg-gray-200" />

        {/* --- Teacher Section --- */}
        <Box className="gap-3">
          <Heading className="text-lg font-semibold">Instructor</Heading>

          <HStack className="items-center gap-3">
            <Avatar className="border-[#f1f1f1] h-14 w-14">
              <AvatarFallbackText>{data.teacher_name}</AvatarFallbackText>
              <AvatarImage source={{ uri: data.teacher_photo }} />
            </Avatar>

            <Box>
              <Text className="text-base font-medium">{data.teacher_name}</Text>
            </Box>
          </HStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

const CourseDetailSkeleton = ({
  isRefetching,
  refetch,
}: {
  isRefetching: boolean;
  refetch: () => void;
}) => {
  return (
    <Box className="flex-1 w-full max-w-screen-md mx-auto">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Box className=" w-full max-w-screen-md mx-auto flex-1 gap-10">
          <Box className="gap-2">
            <SkeletonText speed={3} className="rounded-full h-3 w-40" />
            <SkeletonText speed={4} className="rounded-full h-6" />
            <SkeletonText speed={2} className="rounded-full h-3 w-20" />
          </Box>
          <SkeletonText
            _lines={5}
            speed={1}
            gap={2}
            className="rounded-full h-4"
          />

          <Box className="gap-2">
            <SkeletonText className="h-4 w-28 rounded-full" />
            <Skeleton className="rounded full h-16" speed={4} />
            <Skeleton className="rounded full h-16" speed={3} />
            <Skeleton className="rounded full h-16" speed={2} />
            <Skeleton className="rounded full h-16" speed={1} />
          </Box>
        </Box>
      </ScrollView>
      <Box className="bg-[#f9f9f9] absolute bottom-0 left-0 right-0 z-10 p-4">
        <SkeletonText
          speed={3}
          _lines={1}
          className="h-12 w-full max-w-screen-md mx-auto rounded-full"
        />
      </Box>
    </Box>
  );
};

export default CourseDetails;
