import api from "@/lib/axios";
import { Announcement } from "./announcements.types";

export const getAnnouncements = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Announcement[];
}> => {
  return (await api.get("/announcements/?page=" + pageParam)).data;
};
