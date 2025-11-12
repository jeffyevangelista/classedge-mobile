import { queryClient } from "@/providers/QueryProvider";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  getNotificationCount,
  getNotifications,
  readNotification,
} from "./notifications.apis";

export const useNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 1 }) => getNotifications(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page ? parseInt(page, 10) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useReadNotification = () => {
  return useMutation({
    mutationKey: ["read-notification"],
    mutationFn: (id: number) => readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useNotificationCount = () => {
  return useQuery({
    queryKey: ["notification-count"],
    queryFn: () => getNotificationCount(),
  });
};
