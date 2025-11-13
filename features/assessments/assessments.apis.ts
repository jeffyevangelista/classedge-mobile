import api from "@/lib/axios";
import { Assessment } from "./assessments.types";

export const getAssessments = async ({
  pageParam,
  courseId,
}: {
  pageParam: number;
  courseId: string;
}): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Assessment[];
}> => {
  return (await api.get(`/subjects/${courseId}/activities/?page=${pageParam}`))
    .data;
};

export const getAssessment = async (courseId: string): Promise<Assessment> => {
  return (await api.get(`/activities/${courseId}/`)).data;
};

export const getPendingAssessments = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Assessment[];
}> => {
  return (await api.get(`/activities/pending/?page=${pageParam}`)).data;
};
