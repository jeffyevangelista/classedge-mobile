import Screen from "@/components/screen";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import AnnouncementPreview from "@/features/announcements/components/AnnouncementPreview";
import PendingAssessmentList from "@/features/assessments/components/PendingAssessmentList";
import { Link } from "expo-router";
import { ScrollView } from "react-native";

const HomeScreen = () => {
  return (
    <Screen>
      <ScrollView>
        <Box className="w-full mx-auto max-w-screen-xl gap-10">
          <Box className="mx-5 mt-10">{/* <UpcomingClass /> */}</Box>

          <Box className="mx-5 gap-5">
            <Heading size={"md"}>Pending Submissions</Heading>
            <PendingAssessmentList />
          </Box>
          <Box className="md:mx-5">
            <Box className="flex flex-row px-5 md:px-0 justify-between w-full items-center">
              <Heading size={"md"}>Announcements</Heading>
              <Link href="/announcements" asChild>
                <Button variant="link">
                  <ButtonText>See all</ButtonText>
                </Button>
              </Link>
            </Box>
            <AnnouncementPreview />
          </Box>
        </Box>
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;
