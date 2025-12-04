import TabIcon from "@/components/tab-icon";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
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

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const CourseTabsLayout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarShowIcon: false,
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
      <MaterialTopTabs.Screen
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
      <MaterialTopTabs.Screen
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
      <MaterialTopTabs.Screen
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
    </MaterialTopTabs>
  );
};

export default CourseTabsLayout;
