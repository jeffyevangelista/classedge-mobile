import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Text } from "react-native";
import { Attempt } from "../assessments.types";

const AssessmentAttempts = ({ attempts }: { attempts: Attempt[] }) => {
  return (
    <Box className="mt-5">
      <Heading>Attempts:</Heading>
      <AttemptList attempts={attempts} />
    </Box>
  );
};

export const AttemptList = ({ attempts }: { attempts: Attempt[] }) => {
  if (!attempts || attempts.length === 0) return <Text>No attempts yet</Text>;

  return (
    <>
      {attempts.map((attempt) => (
        <Card key={attempt.id} className="mb-2.5">
          <Text>attempt: {attempt.attempt_number}</Text>
          <Text>retake time: {attempt.started_at}</Text>
          <Text>status: {attempt.status}</Text>
        </Card>
      ))}
    </>
  );
};

export default AssessmentAttempts;
