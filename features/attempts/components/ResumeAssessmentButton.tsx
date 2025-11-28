import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import useStore from "@/lib/store";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { toast } from "sonner-native";
import { useGetAssessmentAttempt } from "../attempts.hooks";

const ResumeAssessmentButton = ({
  assessmentId,
  attemptId,
}: {
  assessmentId: string;
  attemptId: string;
}) => {
  const { setAttempt } = useStore();
  const queryClient = useQueryClient();
  const {
    data: attempt,
    isLoading: attemptLoading,
    error: attemptError,
    refetch,
  } = useGetAssessmentAttempt(attemptId);

  const handleResume = async () => {
    if (attemptLoading) return;

    // Invalidate and refetch to get fresh attempt data with updated remaining_seconds
    await queryClient.invalidateQueries({
      queryKey: ["assessment-attempt", attemptId],
    });
    const { data: freshAttempt } = await refetch();

    if (attemptError) {
      toast.error(
        (attemptError as any)?.message || "Failed to fetch assessment attempt"
      );
      return;
    }

    if (!freshAttempt) {
      toast.error("Assessment attempt not found");
      return;
    }

    setAttempt(freshAttempt);

    router.push(`/(main)/assessment/${assessmentId}/take-activity`);
  };
  return (
    <Button isDisabled={attemptLoading} onPress={() => handleResume()}>
      {attemptLoading ? (
        <ButtonSpinner />
      ) : (
        <ButtonText>Resume Assessment</ButtonText>
      )}
    </Button>
  );
};

export default ResumeAssessmentButton;
