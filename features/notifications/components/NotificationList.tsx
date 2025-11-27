import ErrorFallback from "@/components/error-fallback";
import NoDataFallback from "@/components/no-data-fallback";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Skeleton } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, Pressable, Text } from "react-native";
import { useNotifications, useReadNotification } from "../notifications.hooks";
import type { Notification } from "../notifications.types";

const NotificationList = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotifications();

  if (isLoading) return <ActivityIndicator />;
  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  const notifications = data?.pages.flatMap((page) => page.results) ?? [];

  if (notifications.length === 0)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <NotificationItem {...item} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onRefresh={refetch}
      refreshing={isRefetching}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? <NotificationSkeletons /> : null
      }
    />
  );
};

const NotificationItem = ({
  created_at,
  created_by,
  created_by_photo,
  entity_id,
  entity_type,
  id,
  is_read,
  message,
  user_id,
}: Notification) => {
  const { mutateAsync: readNotification, isPending } = useReadNotification();
  const timeAgo = useMemo(() => useTimeAgo(created_at), [created_at]);

  const handleReadNotification = () => {
    readNotification(id);
  };

  return (
    <Link
      href={
        entity_type === "activity"
          ? `/assessment/${entity_id}`
          : `/material/${entity_id}`
      }
      asChild
    >
      <Pressable
        onPress={handleReadNotification}
        disabled={isPending}
        accessibilityRole="button"
        accessibilityLabel={`${message} - ${timeAgo}`}
        accessibilityState={{ busy: isPending, disabled: isPending }}
        className="active:opacity-70"
      >
        <Card
          className={`rounded-xl w-full max-w-screen-xl mx-auto p-3 mb-1 ${
            is_read ? "bg-[#f9f9f9]" : "bg-primary-50"
          }`}
        >
          <HStack space={"md"} className="items-start">
            <Avatar>
              <AvatarFallbackText>{created_by}</AvatarFallbackText>
              <AvatarImage source={{ uri: created_by_photo }} />
            </Avatar>
            <VStack className="flex-1 h-full">
              <Text
                className={` leading-tight ${
                  is_read
                    ? "text-gray-700"
                    : "text-gray-900 font-poppins-semibold"
                }`}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {message}
              </Text>
              <Text className="text-xs text-neutral-500 mt-1">{timeAgo}</Text>
            </VStack>
          </HStack>
        </Card>
      </Pressable>
    </Link>
  );
};

const NotificationSkeletons = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          speed={(index + 1) as 1 | 2 | 3 | 4}
          className="rounded-xl h-20 mb-1 p-2.5 mx-auto w-full max-w-screen-md"
        />
      ))}
    </>
  );
};

export default NotificationList;
