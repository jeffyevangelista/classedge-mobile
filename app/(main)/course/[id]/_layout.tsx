import TabIcon from "@/components/tab-icon";
import { Tabs } from "expo-router";
import React from "react";
import {
  ClipboardDocumentListIcon as ClipboardDocumentListOutline,
  FolderOpenIcon as FolderOpenOutline,
  UsersIcon as UsersOutline,
} from "react-native-heroicons/outline";
import {
  ClipboardDocumentListIcon as ClipboardDocumentListSolid,
  FolderOpenIcon as FolderOpenSolid,
  UsersIcon as UsersSolid,
} from "react-native-heroicons/solid";

const CourseTabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
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
