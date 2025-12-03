import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { type Attempt } from "@/features/attempts/attempts.types";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const AssessmentAttempts = ({
  attempts,
  showScore,
}: {
  attempts: Attempt[];
  showScore: boolean;
}) => {
  return (
    <Box className="mt-5">
      <Heading>Attempts</Heading>
      <AttemptList attempts={attempts} showScore={showScore} />
    </Box>
  );
};

const StatusPill = ({ status }: { status: Attempt["status"] }) => {
  const colors: Record<string, string> = {
    submitted: "bg-green-200 text-green-800",
    ongoing: "bg-yellow-200 text-yellow-800",
    expired: "bg-red-200 text-red-800",
  };

  return (
    <Box className={`px-2 py-1 rounded-full ${colors[status]} self-start`}>
      <Text className="text-xs font-semibold capitalize">{status}</Text>
    </Box>
  );
};

export const AttemptList = ({
  attempts,
  showScore,
}: {
  attempts: Attempt[];
  showScore: boolean;
}) => {
  if (!attempts || attempts.length === 0)
    return (
      <Box className="py-4">
        <Text className="text-gray-500 text-center">No attempts yet</Text>
      </Box>
    );

  return (
    <>
      {attempts.map((attempt) => (
        <Attempt key={attempt.id} attempt={attempt} showScore={showScore} />
      ))}
    </>
  );
};

const Attempt = ({
  attempt,
  showScore,
}: {
  attempt: Attempt;
  showScore: boolean;
}) => {
  const formattedStartDate = useFormattedDate(attempt.started_at, true);
  const formattedEndDate = useFormattedDate(attempt.will_end_at, true);
  const [timeLeft, setTimeLeft] = useState(attempt.remaining_seconds);

  useEffect(() => {
    // Only run timer for ongoing attempts
    if (attempt.status !== "ongoing") return;

    // Initialize time left
    setTimeLeft(attempt.remaining_seconds);

    // Don't start timer if already expired
    if (attempt.remaining_seconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attempt.status, attempt.remaining_seconds]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimeColor = (seconds: number): string => {
    if (seconds <= 60) return "text-red-600"; // Last minute
    if (seconds <= 300) return "text-orange-600"; // Last 5 minutes
    return "text-yellow-700"; // Normal
  };

  return (
    <Card key={attempt.id} className="mb-3 p-4">
      {/* HEADER */}
      <Box className="flex-row justify-between items-center mb-2">
        <Heading size="sm">Attempt {attempt.attempt_number}</Heading>
        <StatusPill status={attempt.status} />
      </Box>

      {/* BODY */}
      <Box className="mb-1">
        <Text className="text-gray-600 text-sm">
          Started: {formattedStartDate}
        </Text>

        {attempt.status !== "ongoing" ? (
          <Text className="text-gray-600 text-sm">
            Ended: {formattedEndDate}
          </Text>
        ) : (
          <Text className={`text-sm font-semibold ${getTimeColor(timeLeft)}`}>
            Time left: {formatTime(timeLeft)}
          </Text>
        )}
      </Box>

      {/* SCORE (if applicable) */}
      {attempt.status === "submitted" && showScore && (
        <Text className="mt-1 font-semibold text-gray-800">
          Score: {attempt.score}
        </Text>
      )}
    </Card>
  );
};

export default AssessmentAttempts;
