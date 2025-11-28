import api from "@/lib/axios";

export const startAssessmentAttempt = async (assessmentId: string) => {
  return (await api.post(`/activities/${assessmentId}/attempt/start/`)).data;
};

export const getAssessmentAttempt = async (attemptId: string) => {
  return (await api.get(`/attempts/${attemptId}/`)).data;
};
