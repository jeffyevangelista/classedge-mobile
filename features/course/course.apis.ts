import api from "@/lib/axios";
import { Course } from "./course.types";

export const getCourses = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
}> => {
  return (await api.get(`/subjects/?page=${pageParam}`)).data;
};

export const getCourse = async (id: string): Promise<Course> => {
  return (await api.get(`/subjects/${id}/`)).data;
};
