import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getAssessment, getAssessments } from "./assessments.apis";

export const useAssessments = (courseId: string) => {
  return useInfiniteQuery({
    queryKey: ["course-assessments", courseId],
    queryFn: ({ pageParam = 1 }) => getAssessments({ pageParam, courseId }),
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

export const useAssessment = (courseId: string) => {
  return useQuery({
    queryKey: ["course-assessment", courseId],
    queryFn: () => getAssessment(courseId),
    placeholderData: keepPreviousData,
  });
};
