import BackButton from "@/components/back-button";
import TabIcon from "@/components/tab-icon";
import { Link, Tabs, useRouter } from "expo-router";
import React from "react";
import {
  ClipboardDocumentListIcon as ClipboardDocumentListOutline,
  FolderOpenIcon as FolderOpenOutline,
  InformationCircleIcon,
  UsersIcon as UsersOutline,
} from "react-native-heroicons/outline";
import {
  ClipboardDocumentListIcon as ClipboardDocumentListSolid,
  FolderOpenIcon as FolderOpenSolid,
  UsersIcon as UsersSolid,
} from "react-native-heroicons/solid";

const CourseTabsLayout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerRight: () => (
          <Link
            href={"/course/course-details"}
            className="w-10 h-10 rounded-full flex justify-center items-center "
          >
            <InformationCircleIcon color={"#2287d5"} size={28} />
          </Link>
        ),
        headerShadowVisible: false,
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
        },
        tabBarInactiveTintColor: "#9ca3af",
        tabBarActiveTintColor: "#2287d5",
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Materials",
          tabBarLabel: "Materials",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color}
              OutlineIcon={FolderOpenOutline}
              SolidIcon={FolderOpenSolid}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="assessments"
        options={{
          title: "Assessments",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color}
              OutlineIcon={ClipboardDocumentListOutline}
              SolidIcon={ClipboardDocumentListSolid}
            />
          ),
          tabBarLabel: "Assessments",
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: "Students",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color}
              OutlineIcon={UsersOutline}
              SolidIcon={UsersSolid}
            />
          ),
          tabBarLabel: "Students",
        }}
      />
    </Tabs>
  );
};

export default CourseTabsLayout;
