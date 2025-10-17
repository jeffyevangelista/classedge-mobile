import CareerDevelopment from "@/assets/images/intro/career-development.svg";
import OnlineLearning from "@/assets/images/intro/online-learning.svg";
import ProgressTracking from "@/assets/images/intro/progress-tracking.svg";
import Teaching from "@/assets/images/intro/teaching.svg";
import Welcome from "@/assets/images/intro/welcome.svg";
import Screen from "@/components/screen";
import { Button, ButtonText } from "@/components/ui/button";
import { storeASData } from "@/lib/storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "@/utils/storage-keys";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "welcome",
    title: "Welcome to Classedge",
    text: "A unified platform for students and teachers to connect, learn, and grow together.",
    image: Welcome,
  },
  {
    key: "classes",
    title: "Organize Lessons & Tasks",
    text: "Teachers can create lessons while students stay on track with their coursework.",
    image: Teaching,
  },
  {
    key: "progress",
    title: "Monitor Academic Progress",
    text: "Keep track of grades, attendance, and performance all in one place.",
    image: ProgressTracking,
  },
  {
    key: "connect",
    title: "Communicate Effortlessly",
    text: "Announcements, discussions, and updates — all in real time.",
    image: OnlineLearning,
  },
  {
    key: "ready",
    title: "Your Learning Journey Begins",
    text: "Log in to start teaching, learning, and collaborating on Classedge.",
    image: CareerDevelopment,
  },
];

export default function IntroScreen() {
  const router = useRouter();

  const onDone = async () => {
    await storeASData(ASYNC_STORAGE_KEYS.HAS_SEEN_INTRO, true);
    router.replace("/login");
  };

  const GetStartedButton = () => {
    return (
      <Button
        className=" mx-auto w-[80%] max-w-md self-center"
        size={height > 800 ? "xl" : "lg"}
        onPress={onDone}
      >
        <ButtonText>Get Started</ButtonText>
      </Button>
    );
  };

  const renderItem = ({ item }: any) => (
    <Screen withPadding={false} safeArea style={styles.slide}>
      <View style={styles.imageWrapper}>
        <item.image
          width={width * 0.7}
          height={height * 0.45}
          resizeMode="contain"
        />
      </View>
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
      bottomButton
      showNextButton={false}
      onSkip={onDone}
      dotStyle={{ backgroundColor: "#E5E7EB" }}
      activeDotStyle={{ backgroundColor: "#146BB5" }}
      renderSkipButton={() => <GetStartedButton />}
      renderDoneButton={() => <GetStartedButton />}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.08,
    backgroundColor: "#FFFFFF",
  },
  imageWrapper: {
    marginBottom: height * 0.06,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: height > 800 ? 26 : 22,
    textAlign: "center",
    color: "#111827",
    marginBottom: 12,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: height > 800 ? 17 : 15,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 24,
    maxWidth: 360,
  },
});
