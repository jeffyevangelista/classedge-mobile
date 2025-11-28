import NoDataFallback from "@/components/no-data-fallback";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { CircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import useStore from "@/lib/store";
import * as DocumentPicker from "expo-document-picker";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ScrollView, Text } from "react-native";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpTrayIcon,
} from "react-native-heroicons/outline";
import {
  useAssessmentQuestions,
  useAutoSaveAttempt,
  useSubmitAssessmentAnswers,
} from "../assessments.hooks";
import type { Question } from "../assessments.types";

// ----------------------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------------------

const AssessmentQuestions = () => {
  const router = useRouter();
  const { attempt, setTimerSeconds, setAttempt } = useStore();
  const { assessmentId } = useGlobalSearchParams();
  const pageSize = 5;

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useAssessmentQuestions(assessmentId as string);

  const { mutateAsync: autoSaveAttempt } = useAutoSaveAttempt();
  const { mutateAsync: submitAnswer, isPending: submitPending } =
    useSubmitAssessmentAnswers();

  const form = useForm({
    defaultValues: {},
    shouldUnregister: false, // KEEP VALUES ACROSS PAGINATION
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const watchAll = form.watch();

  // ---------------- Submission Handlers ----------------
  const handleAutoSubmit = useCallback(async () => {
    await submitAnswer({
      activityId: assessmentId as string,
      answers: form.getValues(),
    });
    // Clear attempt from store after submission
    setAttempt(null);
    router.back();
  }, [assessmentId, submitAnswer, form, setAttempt, router]);

  const handleSubmit = useCallback(
    async (values: any) => {
      await submitAnswer({
        activityId: assessmentId as string,
        answers: values,
      });
      // Clear attempt from store after submission
      setAttempt(null);
      router.back();
    },
    [assessmentId, submitAnswer, setAttempt, router]
  );

  // ---------------- Timer Setup ----------------
  useEffect(() => {
    if (!attempt) return;
    const rem = attempt.remaining_seconds ?? 0;
    setRemaining(rem);
    // Use setTimeout to defer state update until after render
    setTimeout(() => setTimerSeconds(rem), 0);
  }, [attempt, setTimerSeconds]);

  useEffect(() => {
    if (!attempt) return;

    if (timerRef.current) clearInterval(timerRef.current);

    // Don't start timer if time has already expired
    const initialRemaining = attempt.remaining_seconds ?? 0;
    if (initialRemaining <= 0) {
      return;
    }

    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        const nr = r - 1;
        // Defer Zustand store update to avoid setState during render
        setTimeout(() => setTimerSeconds(Math.max(nr, 0)), 0);

        if (nr <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          // Only auto-submit if we're transitioning from positive to zero
          // Not if we're already at zero (e.g., on remount)
          if (r > 0) {
            handleAutoSubmit();
          }
        }

        return Math.max(nr, 0);
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [attempt, handleAutoSubmit, setTimerSeconds]);

  // ---------------- Autosave Logic ----------------
  useEffect(() => {
    if (!attempt || !assessmentId) return;

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      autoSaveAttempt({
        activityId: assessmentId as string,
        answers: watchAll,
      });
    }, 1000);
  }, [watchAll, attempt, assessmentId, autoSaveAttempt]);

  // ---------------- Early Returns (after all hooks) ----------------
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  const questions = data?.questions || [];
  if (!questions.length)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;
  if (!attempt)
    return <Text>No attempt loaded. Go back and start/resume.</Text>;

  // ---------------- Pagination ----------------
  const pageQuestions = questions.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <FormProvider {...form}>
      <ScrollView ref={scrollRef} className="p-2.5 md:p-0">
        {pageQuestions.map((q, idx) => {
          const questionNumber = currentPage * pageSize + idx + 1;
          return (
            <Question
              key={q.id}
              question={q}
              questionNumber={questionNumber}
              totalQuestions={questions.length}
            />
          );
        })}

        <Box className=" flex-row md:mx-auto max-w-screen-md w-full mt-4 mb-5 px-2.5 md:px-0">
          {currentPage > 0 && (
            <Button
              className="mr-auto"
              onPress={() => goToPage(currentPage - 1)}
            >
              <ButtonIcon as={ArrowLeftIcon} />
              <ButtonText>Previous</ButtonText>
            </Button>
          )}

          {currentPage < Math.ceil(questions.length / pageSize) - 1 && (
            <Button
              className="ml-auto"
              onPress={() => goToPage(currentPage + 1)}
            >
              <ButtonText>Next</ButtonText>
              <ButtonIcon as={ArrowRightIcon} />
            </Button>
          )}

          {currentPage === Math.ceil(questions.length / pageSize) - 1 && (
            <Button
              className="ml-auto"
              onPress={form.handleSubmit(handleSubmit)}
              disabled={submitPending}
            >
              <ButtonText>Submit</ButtonText>
            </Button>
          )}
        </Box>
      </ScrollView>
    </FormProvider>
  );
};

// ----------------------------------------------------------------------------------
// QUESTION WRAPPER
// ----------------------------------------------------------------------------------

const Question = ({
  question,
  questionNumber,
  totalQuestions,
}: {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}) => {
  const questionLabel = `Question ${questionNumber} of ${totalQuestions}`;

  switch (question.quiz_type) {
    case "Multiple Choice":
      return (
        <MultipleChoice question={question} questionLabel={questionLabel} />
      );
    case "True/False":
      return <TrueFalse question={question} questionLabel={questionLabel} />;
    case "Fill in the Blank":
      return (
        <FillInTheBlank question={question} questionLabel={questionLabel} />
      );
    case "Matching Type":
      return <MatchingType question={question} questionLabel={questionLabel} />;
    case "Essay":
      return <Essay question={question} questionLabel={questionLabel} />;
    case "Document":
      return <Document question={question} questionLabel={questionLabel} />;
    case "Calculated Numeric":
      return (
        <CalculatedNumeric question={question} questionLabel={questionLabel} />
      );
    default:
      return null;
  }
};

// ----------------------------------------------------------------------------------
// QUESTION TYPES
// ----------------------------------------------------------------------------------

const MultipleChoice = ({
  question,
  questionLabel,
}: {
  question: Question;
  questionLabel: string;
}) => {
  const { control } = useFormContext();

  return (
    <QuestionCard title={question.question_text} questionLabel={questionLabel}>
      <Controller
        name={String(question.id)}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup value={field.value} onChange={field.onChange}>
            <VStack space="sm">
              {question.choices?.map((choice) => (
                <Radio key={choice.id} value={String(choice.id)}>
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel style={{ marginLeft: 8 }}>
                    {choice.choice_text}
                  </RadioLabel>
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        )}
      />
    </QuestionCard>
  );
};

const TrueFalse = ({
  question,
  questionLabel,
}: {
  question: Question;
  questionLabel: string;
}) => {
  const { control } = useFormContext();

  return (
    <QuestionCard title={question.question_text} questionLabel={questionLabel}>
      <Controller
        name={String(question.id)}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup value={field.value} onChange={field.onChange}>
            <Radio value="true">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>True</RadioLabel>
            </Radio>
            <Radio value="false">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>False</RadioLabel>
            </Radio>
          </RadioGroup>
        )}
      />
    </QuestionCard>
  );
};

const FillInTheBlank = ({
  question,
  questionLabel,
}: {
  question: Question;
  questionLabel: string;
}) => {
  const { control } = useFormContext();

  return (
    <QuestionCard title={question.question_text} questionLabel={questionLabel}>
      <Controller
        name={String(question.id)}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input variant="outline">
            <InputField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter answer"
            />
          </Input>
        )}
      />
    </QuestionCard>
  );
};

const Essay = ({
  question,
  questionLabel,
}: {
  question: Question;
  questionLabel: string;
}) => {
  const { control } = useFormContext();

  return (
    <QuestionCard title={question.question_text} questionLabel={questionLabel}>
      <Controller
        name={String(question.id)}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Textarea>
            <TextareaInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your answer here"
            />
          </Textarea>
        )}
      />
    </QuestionCard>
  );
};

// ---------------- MATCHING TYPE (LEFT -> RIGHT) ----------------

const MatchingType = ({
  question,
  questionLabel,
}: {
  question: Question;
  questionLabel: string;
}) => {
  const { control } = useFormContext();

  const leftItems = question.choices?.filter((c) => c.is_left_side) || [];
  const rightItems = question.choices?.filter((c) => !c.is_left_side) || [];

  return (
    <QuestionCard title={question.question_text} questionLabel={questionLabel}>
      <VStack space="md">
        {leftItems.map((left) => (
          <Box key={left.id} className="flex-row items-center justify-around">
            <Text>{left.choice_text}</Text>

            <Controller
              name={`${question.id}.${left.id}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup value={field.value} onChange={field.onChange}>
                  <VStack>
                    {rightItems.map((right) => (
                      <Radio key={right.id} value={String(right.id)}>
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>{right.choice_text}</RadioLabel>
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              )}
            />
          </Box>
        ))}
      </VStack>
    </QuestionCard>
  );
};

// ---------------- DOCUMENT UPLOAD ----------------

const Document = ({
  question,
  questionLabel,
}: {
  question: Question;
  questionLabel: string;
}) => {
  const { control } = useFormContext();

  const uploadFile = async (field: any) => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: false });

    if (!result.canceled) {
      const success = result.assets[0];
      // In a real app: upload file first, then store file ID
      field.onChange(success.uri);
    }
  };

  return (
    <QuestionCard title={question.question_text} questionLabel={questionLabel}>
      <Controller
        name={String(question.id)}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <Button variant="outline" onPress={() => uploadFile(field)}>
              <ButtonIcon as={ArrowUpTrayIcon} />
              <ButtonText>Upload File</ButtonText>
            </Button>

            {field.value ? (
              <Text style={{ marginTop: 8 }}>{field.value}</Text>
            ) : null}
          </>
        )}
      />
    </QuestionCard>
  );
};

const CalculatedNumeric = ({
  question,
  questionLabel,
}: {
  question: Question;
  questionLabel: string;
}) => (
  <QuestionCard title={question.question_text} questionLabel={questionLabel}>
    <Text>Calculated Numeric - Not implemented yet</Text>
  </QuestionCard>
);

// ----------------------------------------------------------------------------------
// SHARED QUESTION CARD
// ----------------------------------------------------------------------------------

const QuestionCard = ({
  title,
  questionLabel,
  children,
}: {
  title: string;
  questionLabel?: string;
  children: React.ReactNode;
}) => (
  <Card className="mb-2.5 rounded-lg max-w-screen-md mx-auto w-full gap-2.5 p-4">
    {questionLabel && (
      <Text className="text-sm text-gray-600 mb-1">{questionLabel}</Text>
    )}
    <Heading size="md">{title}</Heading>
    {children}
  </Card>
);

export default AssessmentQuestions;

// import useStore from "@/lib/store";
// import React, { useEffect, useRef, useState } from "react";
// import { Text, View } from "react-native";

// const AssessmentQuestions = () => {
//   const { attempt, setTimerSeconds } = useStore();
//   const [remaining, setRemaining] = useState<number>(0);

//   // initialise remaining seconds from the attempt (server should provide a field)
//   useEffect(() => {
//     // attempt.remaining_seconds should have been fetched; fallback to 0
//     const rem = (attempt as any).remaining_seconds ?? 0;
//     setRemaining(rem);
//     // Defer Zustand store update to avoid setState during render
//     setTimeout(() => setTimerSeconds(rem), 0);
//   }, [attempt, setTimerSeconds]);

//   // Timer countdown
//   const timerRef = useRef<number | null>(null);
//   useEffect(() => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setRemaining((r) => {
//         const nr = r - 1;
//         // Defer Zustand store update to avoid setState during render
//         setTimeout(() => setTimerSeconds(Math.max(nr, 0)), 0);
//         if (nr <= 0) {
//           if (timerRef.current) {
//             clearInterval(timerRef.current);
//             timerRef.current = null;
//           }
//           // auto-submit
//           // handleAutoSubmit();
//         }
//         return Math.max(nr, 0);
//       });
//     }, 1000) as unknown as number;

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [setTimerSeconds]);

//   return (
//     <View>
//       <Text style={{ fontSize: 16 }}>Time left: {remaining}s</Text>
//     </View>
//   );
// };

// export default AssessmentQuestions;
