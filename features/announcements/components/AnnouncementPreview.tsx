import { Card } from "@/components/ui/card";
import React from "react";
import { FlatList, Text } from "react-native";
import { useAnnouncementsPreview } from "../announcements.hooks";

const AnnouncementPreview = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useAnnouncementsPreview();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  const announcements = data?.results ?? [];

  if (!isLoading && announcements.length === 0)
    return <Text>No announcements found.</Text>;

  return (
    <FlatList
      className="py-5"
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={announcements}
      renderItem={({ item }) => (
        <Card key={item.id} className=" rounded-xl w-96 gap-2.5 p-5 ml-5">
          <Text
            numberOfLines={1}
            className="text-lg font-poppins-semibold text-neutral-900"
          >
            {item.title}
          </Text>

          <Text
            className="text-sm font-poppins-regular text-neutral-500"
            numberOfLines={4}
          >
            {item.title}
          </Text>

          <Text className="text-xs font-poppins-medium text-neutral-400">
            Posted{" "}
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Card>
      )}
    />
  );
};

export default AnnouncementPreview;
