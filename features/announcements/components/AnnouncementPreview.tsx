import ErrorFallback from "@/components/error-fallback";
import NoDataFallback from "@/components/no-data-fallback";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Text, useWindowDimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useAnnouncementsPreview } from "../announcements.hooks";

const AnnouncementPreview = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useAnnouncementsPreview();
  const { width } = useWindowDimensions();

  // Responsive card width: scales from mobile to tablet/desktop
  // Mobile: width - 40px padding
  // Tablet: 70% of screen width
  // Desktop: max 600px
  const getCardWidth = () => {
    const screenWidth = width ?? 0;
    if (screenWidth < 768) {
      return screenWidth - 40; // Mobile: full width minus padding
    } else if (screenWidth < 1024) {
      return Math.min(screenWidth * 0.7, 600); // Tablet: 70% of width
    } else {
      return 600; // Desktop: fixed max width
    }
  };

  const cardWidth = getCardWidth();
  const cardHeight = Math.max(180, Math.min(cardWidth * 0.5, 240)); // Responsive height

  if (isLoading)
    return (
      <AnnouncementSkeleton cardWidth={cardWidth} cardHeight={cardHeight} />
    );
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
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  return (
    <Carousel
      loop
      width={cardWidth}
      height={cardHeight}
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

const AnnouncementSkeleton = ({
  cardWidth,
  cardHeight,
}: {
  cardWidth: number;
  cardHeight: number;
}) => {
  return (
    <Box
      style={{
        width: cardWidth,
        height: cardHeight,
        marginHorizontal: "auto",
      }}
    >
      <Card
        className="rounded-xl gap-2.5 p-5 border border-neutral-200"
        style={{ width: cardWidth - 10, height: cardHeight - 10 }}
      >
        <VStack space="md" className="flex-1">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <VStack space="sm" className="flex-1">
            <SkeletonText _lines={3} className="h-4" />
          </VStack>
          <Skeleton className="h-4 w-1/3 rounded-md" />
        </VStack>
      </Card>
    </Box>
  );
};

export default AnnouncementPreview;
