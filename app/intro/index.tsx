import CareerDevelopment from "@/assets/images/intro/career-development.svg";
import OnlineLearning from "@/assets/images/intro/online-learning.svg";
import ProgressTracking from "@/assets/images/intro/progress-tracking.svg";
import Teaching from "@/assets/images/intro/teaching.svg";
import Welcome from "@/assets/images/intro/welcome.svg";
import Screen from "@/components/screen";
import { storeASData } from "@/lib/storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "@/utils/storage-keys";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "welcome",
    title: "Welcome to Classedge",
    text: "A unified platform for students and teachers to connect, learn, and grow together.",
    image: Welcome,
    backgroundColor: "#f9f9f9",
  },
  {
    key: "classes",
    title: "Organize Lessons & Tasks",
    text: "Teachers can create lessons while students stay on track with their coursework.",
    image: Teaching,
    backgroundColor: "#f9f9f9",
  },
  {
    key: "progress",
    title: "Monitor Academic Progress",
    text: "Keep track of grades, attendance, and performance all in one place.",
    image: ProgressTracking,
    backgroundColor: "#f9f9f9",
  },
  {
    key: "connect",
    title: "Communicate Effortlessly",
    text: "Announcements, discussions, and updates — all in real time.",
    image: OnlineLearning,
    backgroundColor: "#f9f9f9",
  },
  {
    key: "ready",
    title: "Your Learning Journey Begins",
    text: "Log in to start teaching, learning, and collaborating on Classedge.",

    image: CareerDevelopment,
    backgroundColor: "#f9f9f9",
  },
];
export default function IntroScreen() {
  const router = useRouter();

  const onDone = async () => {
    await storeASData(ASYNC_STORAGE_KEYS.HAS_SEEN_INTRO, true);
    router.replace("/login");
  };

  const renderItem = ({ item }: any) => (
    <Screen
      safeArea
      style={[styles.slide, { backgroundColor: item.backgroundColor }]}
    >
      <item.image
        height={height * 0.5}
        width={width * 0.7}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </Screen>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton
      onSkip={onDone}
      dotStyle={{ backgroundColor: "#ddd" }}
      activeDotStyle={{ backgroundColor: "#146BB5" }}
      renderNextButton={() => (
        <Text className="text-primary-600 font-medium text-base">Next</Text>
      )}
      renderSkipButton={() => (
        <Text className="text-typography-600 font-medium text-base">Skip</Text>
      )}
      renderDoneButton={() => (
        <Text className="text-primary-600 font-semibold text-base">
          Get Started
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: width * 0.25,
    height: height * 0.15,
    marginBottom: 40,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    textAlign: "center",
    color: "#111827",
    marginBottom: 12,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#6B7280",
  },
  button: {
    fontFamily: "Poppins-Medium",
    color: "#2563EB",
    fontSize: 16,
  },
});
