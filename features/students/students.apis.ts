import api from "@/lib/axios";
import { Student } from "./students.types";

export const getStudents = async ({
  pageParam = 1,
  courseId,
}: {
  pageParam: number;
  courseId: string;
}): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
}> => {
  return (await api.get(`/subjects/${courseId}/students/?page=${pageParam}`))
    .data;
};
