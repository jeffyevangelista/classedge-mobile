import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { Link } from "expo-router";
import { ClipboardDocumentCheckIcon } from "react-native-heroicons/outline";
import { Assessment } from "../assessments.types";

const getActivityIcon = (activityType: string) => {
  const iconMap = {
    Assignment: {
      label: "Assignment",
    },
    Exam: {
      label: "Exam",
    },
    SpecialActivity: {
      label: "Special Activity",
    },
    Quiz: {
      label: "Quiz",
    },
    Participation: {
      label: "Participation",
    },
  };
  return iconMap[activityType as keyof typeof iconMap] || iconMap.Assignment;
};

const AssessmentItem = ({
  activity_name,
  activity_type_name,
  end_time,
  id,
}: Assessment) => {
  const { label } = getActivityIcon(activity_type_name);

  const formattedDate = end_time ? useFormattedDate(end_time, true) : null;

  return (
    <Link
      href={`/assessment/${id}`}
      className="max-w-screen-xl mx-auto w-full mt-2.5"
    >
      <Card className="rounded-lg mb-2.5 flex-row items-center">
        <HStack space="md" className="flex-1">
          <Box className={"rounded-full p-2.5 bg-orange-50"}>
            <Icon
              className={"h-6 w-6 text-orange-600"}
              as={ClipboardDocumentCheckIcon}
            />
          </Box>
          <VStack className="flex-1">
            <Text
              className="text-neutral-900 font-poppins-semibold text-lg flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {label}: {activity_name}
            </Text>
            <Text
              className="text-neutral-500 text-xs"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Due {formattedDate}
            </Text>
          </VStack>
        </HStack>
      </Card>
    </Link>
  );
};

export default AssessmentItem;
