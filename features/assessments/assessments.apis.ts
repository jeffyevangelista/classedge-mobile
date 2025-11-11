import api from "@/lib/axios";

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
  results: any;
}> => {
  return (await api.get(`/subjects/${courseId}/activities/?page=${pageParam}`))
    .data;
};

export const getAssessment = async (courseId: string): Promise<any> => {
  return (await api.get(`/activities/${courseId}/`)).data;
};
