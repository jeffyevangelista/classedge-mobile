import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getClassSchedule, getUserDetails } from "./profile.apis";

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: () => getUserDetails(),
  });
};

export const useClassSchedule = () => {
  return useInfiniteQuery({
    queryKey: ["class-schedule"],
    queryFn: ({ pageParam = 1 }) => getClassSchedule({ pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page ? parseInt(page, 10) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });
};
