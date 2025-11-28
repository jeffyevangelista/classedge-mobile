import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssessmentAttempt, startAssessmentAttempt } from "./attempts.apis";

export const useStartAssessmentAttempt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["start-assessment-attempt"],
    mutationFn: (activityId: string) => startAssessmentAttempt(activityId),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["course-assessment", variables],
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
