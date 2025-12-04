import ErrorFallback from "@/components/error-fallback";
import NoDataFallback from "@/components/no-data-fallback";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import {
  addDays,
  differenceInCalendarDays,
  format,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { Link } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
} from "react-native-heroicons/outline";
import { useCalendarItems } from "../calendar.hooks";
import { formatDate } from "./date-formatter";

type CustomMarkedDate = {
  marked?: boolean;
  dotColor?: string;

  // period support
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;

  // custom style support
  customStyles?: {
    container?: object;
    text?: object;
  };
};

type MarkedDates = Record<string, CustomMarkedDate>;

const CalendarComponent = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useCalendarItems();
  const today = format(new Date(), "yyyy-MM-dd");

  const [selectedDate, setSelectedDate] = useState<string>(today);
  if (isLoading)
    return (
      <Box className="h-full items-center justify-center">
        <ActivityIndicator size="large" />
      </Box>
    );
  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  if (!isLoading && (!data || data.length === 0))
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  // ----------------------------------------------------
  // BUILD MARKED DATES
  // ----------------------------------------------------
  const markedDates: MarkedDates = useMemo(() => {
    const marks: MarkedDates = {};

    if (!data) return marks;

    // ------------------------------------------------
    // 1. EVENTS (period)
    // ------------------------------------------------
    data.forEach((item) => {
      if (item.type === "event") {
        const start = parseISO(item.start_date);
        const end = parseISO(item.end_date);

        const diff = differenceInCalendarDays(end, start);

        for (let i = 0; i <= diff; i++) {
          const date = format(addDays(start, i), "yyyy-MM-dd");

          if (!marks[date]) marks[date] = {};

          if (i === 0) marks[date].startingDay = true;
          if (i === diff) marks[date].endingDay = true;

          marks[date].color = "#50cebb";
          marks[date].textColor = "white";
        }
      }
    });

    // ------------------------------------------------
    // 2. ACTIVITIES (dot on end)
    // ------------------------------------------------
    data.forEach((item) => {
      if (item.type === "activity") {
        const endDate = format(parseISO(item.end), "yyyy-MM-dd");

        if (!marks[endDate]) marks[endDate] = {};

        marks[endDate].marked = true;
        marks[endDate].dotColor = "#FF5A5F";
      }
    });

    // ------------------------------------------------
    // 3. SELECTED DATE STYLE (using period properties)
    // ------------------------------------------------
    if (!marks[selectedDate]) marks[selectedDate] = {};

    // Apply selected date styling using period marking properties
    // This ensures it works with markingType="period"
    marks[selectedDate].startingDay = true;
    marks[selectedDate].endingDay = true;
    marks[selectedDate].color = "#146BB5";
    marks[selectedDate].textColor = "white";

    // ------------------------------------------------
    // 4. TODAY STYLE (using period properties)
    // ------------------------------------------------
    if (!marks[today]) marks[today] = {};

    // Only apply today style if it's NOT the selected date
    if (today !== selectedDate) {
      marks[today].startingDay = true;
      marks[today].endingDay = true;
      marks[today].color = "#E3F2FD"; // Light blue background
      marks[today].textColor = "#146BB5";
    }

    return marks;
  }, [data, selectedDate]);

  // ----------------------------------------------------
  // FILTER ITEMS FOR SELECTED DATE
  // ----------------------------------------------------
  const itemsForSelected = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      if (item.type === "activity") {
        const actDate = format(parseISO(item.end), "yyyy-MM-dd");
        return actDate === selectedDate;
      }

      if (item.type === "event") {
        return isWithinInterval(parseISO(selectedDate), {
          start: parseISO(item.start_date),
          end: parseISO(item.end_date),
        });
      }

      return false;
    });
  }, [data, selectedDate]);

  return (
    <ScrollView>
      <Calendar
        markingType="period"
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        theme={{
          arrowColor: "#146BB5",
        }}
      />

      {/* Items under calendar */}
      <Box className="mt-5 mx-5">
        {itemsForSelected.length === 0 ? (
          <Text className="text-center text-neutral-500">
            No events or activities for this date.
          </Text>
        ) : (
          itemsForSelected.map((item) => {
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
                <Box
                  key={item.title}
                  className="max-w-screen-xl mx-auto w-full"
                >
                  <Card className="rounded-lg mb-1 flex-row items-center active:bg-blue-50/50 border-neutral-200 border">
                    <HStack space="md" className="flex-1">
                      <Box className={"rounded-full p-2.5 bg-teal-50"}>
                        <Icon
                          className={"h-6 w-6 text-teal-600"}
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

            return null;
          })
        )}
      </Box>
    </ScrollView>
  );
};

export default CalendarComponent;
