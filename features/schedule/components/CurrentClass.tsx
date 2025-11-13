import React from "react";
import { useCurrentClass } from "../schedule.hooks";
import ScheduleCard from "./ScheduleCard";

const CurrentClass = () => {
  const { data, isLoading, isError, refetch } = useCurrentClass();

  return (
    <ScheduleCard
      type="current"
      data={data}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default CurrentClass;
