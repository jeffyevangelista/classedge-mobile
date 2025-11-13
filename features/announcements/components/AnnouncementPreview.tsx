import ErrorFallback from "@/components/error-fallback";
import { Card } from "@/components/ui/card";
import React from "react";
import { ActivityIndicator, Text, useWindowDimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useAnnouncementsPreview } from "../announcements.hooks";

const AnnouncementPreview = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useAnnouncementsPreview();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(384, width - 40); // 384px = w-96, with 40px padding

  if (isLoading) return <ActivityIndicator />;
  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  const announcements = data?.results ?? [];

  if (!isLoading && announcements.length === 0)
    return <Text>No announcements found.</Text>;

  return (
    <Carousel
      loop
      width={cardWidth}
      height={200}
      autoPlay={true}
      autoPlayInterval={5000}
      data={announcements}
      scrollAnimationDuration={1000}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
      renderItem={({ item }) => (
        <Card
          className="rounded-xl gap-2.5 p-5 "
          style={{ width: cardWidth - 10 }}
        >
          <Text
            numberOfLines={1}
            className="text-2xl font-poppins-semibold text-neutral-900"
          >
            {item.title}
          </Text>

          <Text
            className="text-lg font-poppins-regular text-neutral-500"
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
