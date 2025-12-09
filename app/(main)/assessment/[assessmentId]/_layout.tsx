import BackButton from "@/components/back-button";
import useStore from "@/lib/store";
import { Stack } from "expo-router";
import { Text } from "react-native";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const getTimerColor = (seconds: number): string => {
  if (seconds <= 60) return "#ef4444"; // red - last minute
  if (seconds <= 300) return "#f59e0b"; // orange - last 5 minutes
  return "#000000"; // black - normal
};

const TimerHeader = () => {
  const { timerSeconds } = useStore();
  const color = getTimerColor(timerSeconds);

  return (
    <Text style={{ fontSize: 17, fontWeight: "600", color }}>
      {formatTime(timerSeconds)}
    </Text>
  );
};

export default function AssessmentLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="take-activity"
        options={{
          headerTitle: () => <TimerHeader />,
        }}
      />
    </Stack>
  );
}
