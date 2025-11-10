import { Tabs } from "expo-router";
import React from "react";

const SubjectTabsLayout = () => {
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
      <Tabs.Screen name="index" />
      <Tabs.Screen name="students" />
      <Tabs.Screen name="activities" />
    </Tabs>
  );
};

export default SubjectTabsLayout;
