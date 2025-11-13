import Screen from "@/components/screen";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import AnnouncementPreview from "@/features/announcements/components/AnnouncementPreview";
import PendingAssessmentList from "@/features/assessments/components/PendingAssessmentList";
import CurrentClass from "@/features/schedule/components/CurrentClass";
import UpcomingClass from "@/features/schedule/components/UpcomingClass";
import { Link } from "expo-router";
import { ScrollView } from "react-native";

const HomeScreen = () => {
  return (
    <Screen>
      <ScrollView>
        <Box className="w-full mx-auto max-w-screen-xl gap-5">
          <Grid
            className="gap-5 px-5"
            _extra={{
              className: "grid-cols-2",
            }}
          >
            <GridItem _extra={{ className: "col-span-1" }}>
              <CurrentClass />
            </GridItem>
            <GridItem _extra={{ className: "col-span-1" }}>
              <UpcomingClass />
            </GridItem>
          </Grid>

          <Box className="mx-5 gap-2.5 bg-orange-50 p-5 rounded-xl">
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
