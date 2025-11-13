import React from "react";
import { useUpcomingClass } from "../schedule.hooks";
import ScheduleCard from "./ScheduleCard";

const UpcomingClass = () => {
  const { data, isLoading, isError, refetch } = useUpcomingClass();

  return (
    <ScheduleCard
      type="upcoming"
      data={data}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default UpcomingClass;
