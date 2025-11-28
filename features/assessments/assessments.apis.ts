import api from "@/lib/axios";
import { Assessment, Question } from "./assessments.types";

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

export const getAssessmentQuestions = async (
  assessmentId: string
): Promise<{
  questions: Question[];
  started_at: string;
  will_end_at: string;
  time_remaining_seconds: number;
}> => {
  return (await api.get(`/activities/${assessmentId}/questions/`)).data;
};

export const autoSaveAttempt = async (payload: any) => {
  return (
    await api.post(`/activities/${payload.activityId}/autosave/`, payload)
  ).data;
};

export const submitAssessmentAnswers = async (payload: any) => {
  return await api.post(`/activities/${payload.activityId}/submit/`, payload);
};
