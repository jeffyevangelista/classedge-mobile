import ErrorFallback from "@/components/error-fallback";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import React from "react";
import { useUserDetails } from "../profile.hooks";

const ProfileDetails = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useUserDetails();

  if (isLoading) return <LoadingComponent />;

  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  if (!data)
    return (
      <ErrorFallback
        error="No data found"
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  return (
    <Box className="w-full">
      {/* COVER IMAGE */}
      <Box className="relative">
        <Image
          source={require("@/assets/images/cover.jpg")}
          alt="Cover"
          className="
            w-full mx-auto 
            h-40 md:h-60 xl:h-80 
            object-cover max-w-screen-md
          "
        />

        {/* AVATAR */}
        <Avatar
          className="
            bg-[#f9f9f9] shadow-none absolute bottom-0 left-1/2 
            -translate-x-1/2 translate-y-1/2 
            w-32 h-32 md:w-40 md:h-40 xl:w-56 xl:h-56
            rounded-full border-8 border-[#f9f9f9]
          "
        >
          {data.photo ? (
            <AvatarImage source={{ uri: data.photo }} />
          ) : (
            <AvatarFallbackText>
              {data.first_name + " " + data.last_name}
            </AvatarFallbackText>
          )}
        </Avatar>
      </Box>

      {/* USER INFO */}
      <Box className="items-center mt-20 md:mt-28 space-y-2">
        <Heading size="2xl">{data.first_name + " " + data.last_name}</Heading>
        <Text className="text-base text-gray-600">{data.email}</Text>
        <Text className="text-base text-gray-500">{data.id_number}</Text>
      </Box>
    </Box>
  );
};

const LoadingComponent = () => {
  return (
    <Center className="gap-2.5">
      <Skeleton speed={4} className=" rounded-full h-44 w-44"></Skeleton>
      <Center className="gap-2">
        <SkeletonText speed={4} className="h-8 w-96 rounded-full" />
        <SkeletonText speed={3} className="h-4 w-48 rounded-full" />
        <SkeletonText speed={2} className="h-6 w-64 rounded-full" />
      </Center>
    </Center>
  );
};

export default ProfileDetails;
