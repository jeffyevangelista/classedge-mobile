import ErrorFallback from "@/components/error-fallback";
import FileRenderer from "@/components/file-renderer";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import { useAssessment } from "../assessments.hooks";

const AssessmentDetails = () => {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const { isLoading, isError, error, data, refetch, isRefetching } =
    useAssessment(id as string);

  const formattedDate = data?.end_time
    ? useFormattedDate(data.end_time, true)
    : null;

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

  if (!data) return <Text>No Data found</Text>;

  return (
    <Box className="flex-1 w-full max-w-screen-md mx-auto">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Box className="p-4">
          <Text>Due {formattedDate}</Text>
          <Heading size="2xl">
            {data.activity_type_name}: {data?.activity_name}
          </Heading>
          {data.show_score && (
            <Text> Student total score / {data.max_score}</Text>
          )}
          <Text>
            Retakes: {data.student_retake_count} / {data.max_retake}
          </Text>
          {data.activity_instruction && (
            <>
              <Heading>Instructions:</Heading>
              <Text className="text-typography-500 text-justify">
                {data.activity_instruction}
              </Text>
            </>
          )}

          {data.lesson_urls.length > 0 &&
            data.lesson_urls.map((url) => (
              <FileRenderer url={url} key={url.id} />
            ))}
        </Box>
      </ScrollView>

      {/* sticky bottom button */}
      <Box className="absolute bottom-0 left-0 right-0 p-4 bg-[#f9f9f9] z-10">
        {/* {isMaxRetake || (noTakes && isPastDue) ? ( */}
        {/* <Button>
            <ButtonText>View Score</ButtonText>
          </Button> */}
        {/* // ) : ( */}
        <Button
        // onPress={() =>
        //   router.push(`/(root)/(protected)/activity/${id}/take-activity/`)
        // }
        >
          <ButtonText>Take Activity</ButtonText>
        </Button>
        {/* // )} */}
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
