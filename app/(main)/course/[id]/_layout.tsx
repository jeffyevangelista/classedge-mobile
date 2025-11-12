import TabIcon from "@/components/tab-icon";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
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
import { InformationCircleIcon } from "react-native-heroicons/outline";
import { useSharedValue } from "react-native-reanimated";
import { TabScrollContext } from "@/contexts/TabScrollContext";

const CourseTabsLayout = () => {
  const router = useRouter();
  const scrollY = useSharedValue(0);

  return (
    <TabScrollContext.Provider value={{ scrollY }}>
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
          header: ({ route }) => {
            const CollapsibleHeader = require("@/components/CollapsibleHeader").default;
            return (
              <CollapsibleHeader
                title={route.name === "index" ? "Materials" : route.name === "assessments" ? "Assessments" : "Students"}
                scrollY={scrollY}
                headerRight={
                  <Pressable
                    onPress={() => {
                      router.push("/course/course-details");
                    }}
                    className="w-10 h-10 rounded-full flex justify-center items-center"
                  >
                    <InformationCircleIcon color="#2287d5" size={28} />
                  </Pressable>
                }
              />
            );
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
    </TabScrollContext.Provider>
  );
};

export default CourseTabsLayout;
