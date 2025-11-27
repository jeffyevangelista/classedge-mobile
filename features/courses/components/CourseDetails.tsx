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
import { ScrollView, Text } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useCourse } from "../courses.hooks";

const CourseDetails = () => {
  const { id } = useGlobalSearchParams();
  const { isLoading, data, isError, error, refetch, isRefetching } = useCourse(
    id as string
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
    <Box className="w-full mx-auto max-w-screen-md gap-5">
      <Box className="gap-2.5">
        <Image
          source={data.subject_photo}
          alt="Cover"
          className="w-full rounded-lg h-48 object-cover"
        />
        <Heading>{data.subject_name}</Heading>
        <Text>{data.subject_code}</Text>
        <Text>Room: {data.room_number}</Text>
        <Text>{data.subject_description}</Text>
      </Box>

      <HStack className="items-center" space={"md"}>
        <Avatar className="border-[#f9f9f9]">
          <AvatarFallbackText>{data?.teacher_name}</AvatarFallbackText>
          <AvatarImage source={{ uri: data?.teacher_photo }} />
        </Avatar>
        <Text>{data.teacher_name}</Text>
      </HStack>
    </Box>
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
