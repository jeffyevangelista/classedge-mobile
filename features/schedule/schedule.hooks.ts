import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCurrentClass, getUpcomingClass } from "./schedule.apis";

export const useCurrentClass = () => {
  return useQuery({
    queryKey: ["current-class"],
    queryFn: () => getCurrentClass(),
    placeholderData: keepPreviousData,
  });
};

export const useUpcomingClass = () => {
  return useQuery({
    queryKey: ["upcoming-class"],
    queryFn: () => getUpcomingClass(),
    placeholderData: keepPreviousData,
  });
};
