import { COLORS } from "@/colors";
import TabIcon from "@/components/tab-icon";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import {
  BellIcon as BellOutline,
  BookOpenIcon as BookOpenOutline,
  CalendarIcon as CalendarOutline,
  ChatBubbleOvalLeftEllipsisIcon as ChatOutline,
  HomeIcon as HomeOutline,
} from "react-native-heroicons/outline";
import {
  BellIcon as BellSolid,
  BookOpenIcon as BookOpenSolid,
  CalendarIcon as CalendarSolid,
  ChatBubbleOvalLeftEllipsisIcon as ChatSolid,
  HomeIcon as HomeSolid,
} from "react-native-heroicons/solid";

export default () => (
  <Tabs
    screenOptions={{
      headerRight: () => <LogoutButton />,
      headerShadowVisible: false,
      animation: "shift",
      headerTitleAlign: "left",
      tabBarInactiveTintColor: "#9ca3af",
      headerTitleStyle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: Platform.OS === "ios" ? 28 : 32,
        color: "#000",
      },
      tabBarActiveTintColor: COLORS.primary,
      headerTintColor: COLORS.primary,
      tabBarLabelStyle: {
        fontFamily: "Poppins-Medium",
      },
      tabBarStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderTopWidth: 0,
        // bottom: isConnected ? 0 : 45,
      },
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: "#f9f9f9",
      },
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabIcon
            focused={focused}
            color={color}
            OutlineIcon={HomeOutline}
            SolidIcon={HomeSolid}
          />
        ),
        headerTitle: "",
        tabBarLabel: "Home",
        // headerLeft: () => (
        //   // <Image
        //   //   source={require("@/assets/images/logo.png")}
        //   //   alt="logo"
        //   //   resizeMode="contain"
        //   //   size="xs"
        //   //   className="ml-3"
        //   // />
        // ),
      }}
    />
    <Tabs.Screen
      name="calendar"
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabIcon
            focused={focused}
            color={color}
            OutlineIcon={CalendarOutline}
            SolidIcon={CalendarSolid}
          />
        ),
        headerTitle: "Calendar",
        tabBarLabel: "Calendar",
        headerStyle: {
          backgroundColor: "white",
        },
      }}
    />
    <Tabs.Screen
      name="courses"
      options={{
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <TabIcon
            focused={focused}
            color={color}
            OutlineIcon={BookOpenOutline}
            SolidIcon={BookOpenSolid}
          />
        ),
        headerTitle: "Courses",
        tabBarLabel: "Courses",
      }}
    />
    <Tabs.Screen
      name="messages"
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabIcon
            focused={focused}
            color={color}
            OutlineIcon={ChatOutline}
            SolidIcon={ChatSolid}
          />
        ),
        headerTitle: "Messages",
        tabBarLabel: "Messages",
      }}
    />
    <Tabs.Screen
      name="notifications"
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabIcon
            focused={focused}
            color={color}
            OutlineIcon={BellOutline}
            SolidIcon={BellSolid}
          />
        ),
        headerTitle: "Notifications",
        tabBarLabel: "Notifications",
        // tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
      }}
    />
  </Tabs>
);
