import ErrorFallback from "@/components/error-fallback";
import { Card } from "@/components/ui/card";
import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { useAnnouncements } from "../announcements.hooks";
import { Announcement } from "../announcements.types";

const AnnouncementList = () => {
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
  } = useAnnouncements();

  if (isLoading) return <ActivityIndicator />;
  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  const announcements = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && announcements.length === 0)
    return <Text>No announcements found.</Text>;

  return (
    <FlatList
      data={announcements}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AnnouncementItem {...item} />}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 16 }}
    />
  );
};

const AnnouncementItem = ({ date, id, title }: Announcement) => {
  return (
    <Card
      key={id}
      className=" rounded-xl max-w-screen-xl mx-auto w-full gap-2.5 p-5 mb-2.5"
    >
      <Text className="text-lg font-poppins-semibold text-neutral-900">
        {title}
      </Text>

      <Text className="text-sm font-poppins-regular text-neutral-500">
        {title}
      </Text>

      <Text className="text-xs font-poppins-medium text-neutral-400">
        Posted{" "}
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
    </Card>
  );
};

export default AnnouncementList;
