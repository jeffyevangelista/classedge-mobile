import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
} from "react-native-heroicons/outline";
import { useCalendarItems } from "../calendar.hooks";
import { CalendarItem } from "../calendar.types";
import { buildMarkedDates } from "./buildMarkedDates";
import { formatDate } from "./date-formatter";
import { getItemsForDate } from "./getItemsForDate";

const CalendarComponent = () => {
  const { data, isLoading, isError, error } = useCalendarItems();

  const [selected, setSelected] = React.useState<string | null>(
    new Date().toISOString().split("T")[0]
  );

  if (isLoading) return <Text>loading...</Text>;
  if (isError) return <Text>{error.message}</Text>;
  if (!data) return <Text>no data</Text>;

  const marked = buildMarkedDates(data);

  const mergedMarked = {
    ...marked,
    ...(selected && {
      [selected]: {
        ...(marked[selected] || {}),
        selected: true,
        selectedColor: "#0077ff",
      },
    }),
  };

  const items: CalendarItem[] = selected ? getItemsForDate(data, selected) : [];

  return (
    <ScrollView className="bg-[#f9f9f9] h-full">
      <Calendar
        markingType="period"
        markedDates={mergedMarked}
        onDayPress={(day) => setSelected(day.dateString)}
      />

      <View className="p-5 ">
        <Text className="text-center text-neutral-900 font-poppins-semibold text-lg mb-5">
          {selected ? `Agenda for ${formatDate(selected)}` : "Select a date"}
        </Text>

        {selected && items.length === 0 && (
          <Text className="text-center text-neutral-500">
            No events or activities for this date.
          </Text>
        )}

        {items.map((item) => {
          if (item.type === "activity") {
            return (
              <Link
                key={item.title}
                href={`/assessment/${item.id}`}
                className="max-w-screen-xl mx-auto w-full"
                asChild
              >
                <Card className="rounded-lg mb-1 flex-row items-center active:bg-orange-50/50 border-neutral-200 border">
                  <HStack space="md" className="flex-1">
                    <Box className={"rounded-full p-2.5 bg-orange-50"}>
                      <Icon
                        className={"h-6 w-6 text-orange-600"}
                        as={ClipboardDocumentCheckIcon}
                      />
                    </Box>
                    <VStack className="flex-1">
                      <Text
                        className="text-neutral-900 font-poppins-semibold text-lg flex-1"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.title}
                      </Text>
                      <HStack space="xs" className="items-center">
                        <Text
                          className="text-neutral-500 text-xs"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Due {formatDate(item.end)}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </Card>
              </Link>
            );
          }

          if (item.type === "event") {
            return (
              <Box key={item.title} className="max-w-screen-xl mx-auto w-full">
                <Card className="rounded-lg mb-1 flex-row items-center active:bg-blue-50/50 border-neutral-200 border">
                  <HStack space="md" className="flex-1">
                    <Box className={"rounded-full p-2.5 bg-blue-50"}>
                      <Icon
                        className={"h-6 w-6 text-blue-600"}
                        as={CalendarDaysIcon}
                      />
                    </Box>
                    <VStack className="flex-1">
                      <Text
                        className="text-neutral-900 font-poppins-semibold text-lg flex-1"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.title}
                      </Text>
                      <HStack space="xs" className="items-center">
                        <Text
                          className="text-neutral-500 text-xs"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {formatDate(item.start_date)} -{" "}
                          {formatDate(item.end_date)}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </Card>
              </Box>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};

export default CalendarComponent;
