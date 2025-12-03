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
  getAssessmentQuestions,
  getAssessments,
  getPendingAssessments,
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

export const useAssessment = (assessmentId: string) => {
  return useQuery({
    queryKey: ["course-assessment", assessmentId],
    queryFn: () => getAssessment(assessmentId),
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
    refetchOnMount: "always", // Always refetch to get latest attempt status
    enabled: !!assessmentId,
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["submit-answer"],
    mutationFn: (payload: any) => submitAssessmentAnswers(payload),
    onError: (error, context) => {
      console.log({ error, context });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["course-assessment", variables.activityId],
      });
    },
  });
};
