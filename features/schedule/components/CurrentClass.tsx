import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";
import { useCurrentClass } from "../schedule.hooks";

const CurrentClass = () => {
  return (
    <Card className="w-full p-5 text-typography-white rounded-xl gap-5 bg-teal-100">
      <Box className="gap-2.5">
        <Box className="self-start bg-teal-200 rounded px-2 py-1">
          <Text className="text-teal-600 font-poppins-semibold text-2xs">
            Current Class
          </Text>
        </Box>
        <CurrentClassItem />
      </Box>
    </Card>
  );
};

const CurrentClassItem = () => {
  const dateToday = new Date();
  const dayOfTheWeek = dateToday.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDay = tomorrow.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const getDayLabel = (daysOfWeek: string[]) => {
    // Since this is for "current class", prioritize tomorrow if it exists
    if (daysOfWeek.includes(tomorrowDay)) {
      return tomorrowDay;
    } else if (daysOfWeek.includes(dayOfTheWeek)) {
      return dayOfTheWeek;
    } else {
      // Find the next current day
      const nextDay = daysOfWeek[0]; // Assuming the API returns the next scheduled day first
      return nextDay;
    }
  };

  const formatTime = (militaryTime: string) => {
    // Parse the time string (assuming format like "14:30" or "14:30:00")
    const [hours, minutes] = militaryTime.split(":");
    const hour24 = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);

    // Convert to 12-hour format
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? "PM" : "AM";

    // Format minutes with leading zero if needed
    const formattedMinutes = minute.toString().padStart(2, "0");

    return `${hour12}:${formattedMinutes} ${ampm}`;
  };

  const { data, isLoading, isError, refetch } = useCurrentClass();

  if (isLoading) return <ActivityIndicator />;

  if (isError)
    return (
      <Pressable onPress={() => refetch()}>
        <ExclamationCircleIcon />
      </Pressable>
    );

  if (!data?.schedule)
    return (
      <Box>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className=" text-xl font-poppins-semibold text-teal-600"
        ></Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="text-center text-xs text-teal-600 font-poppins-regular"
        >
          No class found
        </Text>
      </Box>
    );

  const schedule = data.schedule;

  return (
    <Box>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        className=" text-lg font-poppins-semibold text-teal-600"
      >
        {schedule.subject_name}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        className="text-xs text-teal-600 font-poppins-regular"
      >
        {getDayLabel(schedule.days_of_week)} •{" "}
        {formatTime(schedule.schedule_start_time)} • {schedule.room_number}
      </Text>
    </Box>
  );
};

export default CurrentClass;
