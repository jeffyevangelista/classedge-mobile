import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { useTimeFormat } from "@/hooks/useTimeFormat";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";
import { ClassSchedule } from "../schedule.types";

type ScheduleCardProps = {
  type: "current" | "upcoming";
  data: { schedule: ClassSchedule } | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const ScheduleCard = ({
  type,
  data,
  isLoading,
  isError,
  refetch,
}: ScheduleCardProps) => {
  const label = type === "current" ? "Current Class" : "Upcoming Class";

  return (
    <Card className="w-full border border-primary-200 p-5  rounded-xl gap-5 bg-primary-100">
      <Box className="gap-2.5">
        <Box className="self-start bg-primary-200 rounded px-2 py-1">
          <Text className="text-primary-600 font-poppins-semibold text-2xs">
            {label}
          </Text>
        </Box>
        <ScheduleCardContent
          data={data}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      </Box>
    </Card>
  );
};

type ScheduleCardContentProps = {
  data: { schedule: ClassSchedule } | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const ScheduleCardContent = ({
  data,
  isLoading,
  isError,
  refetch,
}: ScheduleCardContentProps) => {
  const router = useRouter();
  const getDayLabel = (daysOfWeek: string[]) => {
    const dateToday = new Date();
    const dayOfTheWeek = dateToday.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const tomorrow = new Date(dateToday);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDay = tomorrow.toLocaleDateString("en-US", {
      weekday: "short",
    });

    if (daysOfWeek.includes(tomorrowDay)) {
      return tomorrowDay;
    } else if (daysOfWeek.includes(dayOfTheWeek)) {
      return dayOfTheWeek;
    } else {
      // Find the next scheduled day
      return daysOfWeek[0];
    }
  };

  if (isLoading) return <ActivityIndicator />;

  if (isError)
    return (
      <Pressable onPress={() => refetch()}>
        <ExclamationCircleIcon className="h-6 w-6 text-primary-600" />
      </Pressable>
    );

  if (!data?.schedule)
    return (
      <Box className="min-h-[39px] justify-center">
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="text-sm text-primary-600 font-poppins-regular"
        >
          No class scheduled
        </Text>
      </Box>
    );

  const schedule = data.schedule;
  const formattedTime = useTimeFormat(schedule.schedule_start_time);

  return (
    <Pressable onPress={() => router.push(`/course/${schedule.subject_id}`)}>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        className="text-lg font-poppins-semibold text-primary-600"
      >
        {schedule.subject_name}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        className="text-xs text-primary-600 font-poppins-regular"
      >
        {getDayLabel(schedule.days_of_week)} • {formattedTime} •{" "}
        {schedule.room_number}
      </Text>
    </Pressable>
  );
};

export default ScheduleCard;
