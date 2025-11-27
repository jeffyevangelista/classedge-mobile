import NoDataFallback from "@/components/no-data-fallback";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { ButtonSpinner } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { format } from "date-fns";
import React from "react";
import { FlatList } from "react-native";
import { useClassSchedule } from "../profile.hooks";

type ClassScheduleItem = {
  id: number;
  subject_name: string;
  schedule_start_time: string;
  schedule_end_time: string;
  assign_teacher: string;
  room: string;
  days_of_week: string[];
};

const ScheduleCard = ({ item }: { item: ClassScheduleItem }) => {
  const start = format(
    new Date(`1970-01-01T${item.schedule_start_time}`),
    "hh:mm a"
  );
  const end = format(
    new Date(`1970-01-01T${item.schedule_end_time}`),
    "hh:mm a"
  );

  return (
    <Card
      size="md"
      variant="outline"
      className="mb-4 rounded-xl border border-gray-200 bg-white mx-5"
    >
      <Box className="pb-0">
        <VStack space="sm">
          <Text className="text-lg font-poppins-semibold text-gray-900">
            {item.subject_name}
          </Text>

          <Text className="text-sm text-gray-500">{item.assign_teacher}</Text>
        </VStack>
      </Box>

      <Divider className="my-3" />

      <Box>
        <VStack space="md" className="gap-3">
          <HStack space="md" className="flex-row items-center gap-2">
            <Text className="font-poppins-semibold text-gray-800">Time:</Text>
            <Text className="text-gray-600">
              {start} – {end}
            </Text>
          </HStack>

          <HStack space="md" className="flex-row items-center gap-2">
            <Text className="font-poppins-semibold text-gray-800">Room:</Text>
            <Text className="text-gray-600">{item.room}</Text>
          </HStack>

          <HStack space="sm" className="flex-row flex-wrap gap-2">
            {item.days_of_week.map((day) => (
              <Badge
                className="rounded-lg"
                key={day}
                variant="solid"
                action="info"
                size="lg"
              >
                <BadgeText>{day}</BadgeText>
              </Badge>
            ))}
          </HStack>
        </VStack>
      </Box>
    </Card>
  );
};

const ClassScheduleList = () => {
  const {
    data,
    isError,
    error,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useClassSchedule();

  if (isLoading)
    return (
      <HStack className="mt-10 justify-center">
        <ButtonSpinner size="large" />
      </HStack>
    );

  if (isError) return <Text>{error.message}</Text>;
  if (!data)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  const classSchedules = data.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && classSchedules.length === 0)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={classSchedules}
      renderItem={({ item }) => <ScheduleCard item={item} />}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={() => {
        if (!isFetchingNextPage && hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <HStack className="py-4 justify-center">
            <ButtonSpinner />
          </HStack>
        ) : null
      }
    />
  );
};

export default ClassScheduleList;
