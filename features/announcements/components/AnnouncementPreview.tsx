import ErrorFallback from "@/components/error-fallback";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import React from "react";
import { ActivityIndicator, Text, useWindowDimensions } from "react-native";
import { BellIcon } from "react-native-heroicons/outline";
import Carousel from "react-native-reanimated-carousel";
import { useAnnouncementsPreview } from "../announcements.hooks";

const AnnouncementPreview = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useAnnouncementsPreview();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(384, (width ?? 0) - 40); // 384px = w-96, with 40px padding

  if (isLoading) return <ActivityIndicator />;
  if (isError)
    return (
      <ErrorFallback
        error={error instanceof Error ? error.message : "An error occurred"}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  const announcements = data?.results ?? [];

  if (!isLoading && announcements.length === 0)
    return (
      <Box className="items-center justify-center py-8 px-5">
        <Box className="bg-neutral-100 p-4 rounded-full mb-3">
          <Icon as={BellIcon} className="h-8 w-8 text-neutral-400" />
        </Box>
        <Text className="text-neutral-500 font-poppins-regular text-sm">
          No announcements at the moment
        </Text>
      </Box>
    );

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
          className="rounded-xl gap-2.5 p-5 border border-neutral-200"
          style={{ width: cardWidth - 10 }}
        >
          {/* <Box className="flex-row items-start justify-between"> */}
          <Text
            numberOfLines={1}
            className="text-2xl font-poppins-semibold text-neutral-900"
          >
            {item.title}
          </Text>

          <Text className="text-sm font-poppins-regular text-neutral-500">
            {item.description}
          </Text>
          {/* <Badge size="sm" variant="outline" className="border-primary-300">
            <BadgeText className="text-primary-600 text-2xs font-poppins-medium">
              {item.type}
            </BadgeText>
          </Badge> */}
          {/* </Box> */}

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
