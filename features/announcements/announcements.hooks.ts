import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getAnnouncements } from "./announcements.apis";

export const useAnnouncements = () => {
  return useInfiniteQuery({
    queryKey: ["announcements"],
    queryFn: ({ pageParam = 1 }) => getAnnouncements({ pageParam }),
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

export const useAnnouncementsPreview = () => {
  return useQuery({
    queryKey: ["announcements", 1],
    queryFn: () => getAnnouncements({ pageParam: 1 }),
    placeholderData: keepPreviousData,
  });
};
