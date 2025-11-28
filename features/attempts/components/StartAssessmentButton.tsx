import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useStore from "@/lib/store";
import { useRouter } from "expo-router";
import React from "react";
import { toast } from "sonner-native";
import { useStartAssessmentAttempt } from "../attempts.hooks";

const StartAssessmentButton = ({ assessmentId }: { assessmentId: string }) => {
  const router = useRouter();
  const { attempt, setAttempt } = useStore();
  const { mutateAsync: startAttempt, isPending } = useStartAssessmentAttempt();

  // Check if there's an ongoing attempt for a different assessment
  const hasOngoingAttemptForDifferentAssessment =
    attempt &&
    attempt.status === "ongoing" &&
    attempt.activity_id !== Number(assessmentId);

  const handleStart = async () => {
    if (hasOngoingAttemptForDifferentAssessment) {
      toast.error("Please complete or submit your ongoing assessment first");
      return;
    }

    try {
      const newAttempt = await startAttempt(assessmentId as string);

      setAttempt(newAttempt);
      router.push(`/(main)/assessment/${assessmentId}/take-activity`);
    } catch (error: any) {
      toast.error(error.message || "Failed to start assessment attempt");
    }
  };

  if (hasOngoingAttemptForDifferentAssessment) {
    return (
      <>
        <Button isDisabled onPress={() => handleStart()}>
          <ButtonText>Take Assessment</ButtonText>
        </Button>
        <Text className="text-xs text-center text-orange-600 mt-2">
          You have an ongoing assessment. Please complete it first.
        </Text>
      </>
    );
  }

  return (
    <Button isDisabled={isPending} onPress={() => handleStart()}>
      <ButtonText>Take Assessment</ButtonText>
    </Button>
  );
};

export default StartAssessmentButton;
