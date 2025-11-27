import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  autoSaveAttempt,
  getAssessment,
  getAssessmentAttempt,
  getAssessmentQuestions,
  getAssessments,
  getPendingAssessments,
  startAssessmentAttempt,
  submitAssessmentAnswers,
} from "./assessments.apis";

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
    enabled: !!courseId,
  });
};

export const useAssessment = (courseId: string) => {
  return useQuery({
    queryKey: ["course-assessment", courseId],
    queryFn: () => getAssessment(courseId),
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
    refetchOnMount: "always", // Always refetch to get latest attempt status
  });
};

export const usePendingAssessments = () => {
  return useInfiniteQuery({
    queryKey: ["pending-assessments"],
    queryFn: ({ pageParam = 1 }) => getPendingAssessments({ pageParam }),
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

export const useAssessmentQuestions = (assessmentId: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["assessment-questions", assessmentId],
    queryFn: async () => {
      const data = await getAssessmentQuestions(assessmentId);
      queryClient.invalidateQueries({
        // queryKey: ["course-assessment", assessmentId],
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useStartAssessmentAttempt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["start-assessment-attempt"],
    mutationFn: (activityId: string) => startAssessmentAttempt(activityId),

    onSuccess: (data, variables) => {
      console.log({ data, variables });

      queryClient.invalidateQueries({
        // queryKey: ["course-assessment", variables],
      });
    },
  });
};

export const useGetAssessmentAttempt = (attemptId?: string) => {
  return useQuery({
    queryKey: ["assessment-attempt", attemptId],
    queryFn: () => getAssessmentAttempt(attemptId as string),
    enabled: !!attemptId,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data (formerly cacheTime in v4)
    refetchOnMount: "always", // Always refetch when component mounts
  });
};

export const useAutoSaveAttempt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["auto-save-assessment-attempt"],
    mutationFn: (payload: any) => autoSaveAttempt(payload),
    onError: (error, context) => {
      console.log({ error, context });
    },
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: ["course-assessment", variables],
      });
    },
  });
};

export const useSubmitAssessmentAnswers = () => {
  return useMutation({
    mutationKey: ["submit-answer"],
    mutationFn: (payload: any) => submitAssessmentAnswers(payload),
    onError: (error, context) => {
      console.log({ error, context });
    },
    onSuccess: (data, variables) => {
      console.log("Success", { data, variables });
    },
  });
};
