import ErrorFallback from "@/components/error-fallback";
import FileRenderer from "@/components/file-renderer";
import NoDataFallback from "@/components/no-data-fallback";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import ResumeAssessmentButton from "@/features/attempts/components/ResumeAssessmentButton";
import StartAssessmentButton from "@/features/attempts/components/StartAssessmentButton";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useLocalSearchParams } from "expo-router";
import { RefreshControl, ScrollView, Text } from "react-native";
import { useAssessment } from "../assessments.hooks";
import AssessmentAttempts from "./AssessmentAttempts";
const AssessmentDetails = () => {
  const { assessmentId } = useLocalSearchParams();
  const { isLoading, isError, error, data, refetch, isRefetching } =
    useAssessment(assessmentId as string);
  const attemptId = data?.ongoing_attempt?.id?.toString();

  if (isLoading)
    return (
      <LoadingComponent isRefetching={isLoading} refetch={() => refetch()} />
    );

  if (isError)
    return (
      <ErrorFallback
        isRefetching={isRefetching}
        refetch={refetch}
        error={error.message}
      />
    );

  if (!data)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  const ongoing = data.ongoing_attempt;
  const isPastDue = data.end_time
    ? new Date(data.end_time) < new Date()
    : false;
  const isOutOfAttempts = data.remaining_attempts === 0;

  let actionButton = null;
  if (ongoing) {
    actionButton = (
      <ResumeAssessmentButton
        assessmentId={assessmentId as string}
        attemptId={attemptId as string}
      />
    );
  } else if (isPastDue) {
    actionButton = (
      <Button isDisabled>
        <ButtonText>Past Due</ButtonText>
      </Button>
    );
  } else if (isOutOfAttempts) {
    actionButton = (
      <Button isDisabled>
        <ButtonText>No Attempts Left</ButtonText>
      </Button>
    );
  } else {
    actionButton = (
      <StartAssessmentButton assessmentId={assessmentId as string} />
    );
  }

  return (
    <Box className="flex-1 w-full max-w-screen-md mx-auto">
      <ScrollView
        className="pb-24"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Box className="p-4">
          <Text>Due {useFormattedDate(data.end_time, true)} </Text>
          <Heading size="2xl">
            {data.activity_type_name}: {data?.activity_name}
          </Heading>

          <Text>
            {data.max_score} Points • {data.time_duration} Minutes
          </Text>

          {data.activity_instruction && (
            <Box className="mt-5">
              <Heading>Instructions</Heading>
              <Text className="text-typography-500 text-justify">
                {data.activity_instruction}
              </Text>
            </Box>
          )}
          <Box className="mt-5">
            <Heading>Materials</Heading>
            {data.lesson_urls.length > 0 ? (
              data.lesson_urls.map((url) => (
                <FileRenderer url={url} key={url.id} />
              ))
            ) : (
              <Text className="text-typography-400">
                No materials available
              </Text>
            )}
          </Box>

          <AssessmentAttempts
            attempts={data.attempts}
            showScore={data.show_score}
          />
        </Box>
        <Box className="h-24" />
      </ScrollView>

      {/* sticky bottom button */}
      <Box className="absolute bottom-0 left-0 right-0 p-4 bg-[#f9f9f9] z-10">
        {actionButton}
      </Box>
    </Box>
  );
};

const LoadingComponent = ({
  isRefetching,
  refetch,
}: {
  isRefetching: boolean;
  refetch: () => void;
}) => {
  return (
    <Box className="flex-1 w-full max-w-screen-md mx-auto">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Box className=" w-full max-w-screen-md mx-auto flex-1 gap-10">
          <Box className="gap-2">
            <SkeletonText speed={3} className="rounded-full h-3 w-40" />
            <SkeletonText speed={4} className="rounded-full h-6" />
            <SkeletonText speed={2} className="rounded-full h-3 w-20" />
          </Box>
          <SkeletonText
            _lines={5}
            speed={1}
            gap={2}
            className="rounded-full h-4"
          />

          <Box className="gap-2">
            <SkeletonText className="h-4 w-28 rounded-full" />
            <Skeleton className="rounded full h-16" speed={4} />
            <Skeleton className="rounded full h-16" speed={3} />
            <Skeleton className="rounded full h-16" speed={2} />
            <Skeleton className="rounded full h-16" speed={1} />
          </Box>
        </Box>
      </ScrollView>
      <Box className="bg-[#f9f9f9] absolute bottom-0 left-0 right-0 z-10 p-4">
        <SkeletonText
          speed={3}
          _lines={1}
          className="h-12 w-full max-w-screen-md mx-auto rounded-full"
        />
      </Box>
    </Box>
  );
};

export default AssessmentDetails;
