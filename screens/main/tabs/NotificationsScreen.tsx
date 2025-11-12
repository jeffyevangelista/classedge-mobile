import NotificationList from "@/features/notifications/components/NotificationList";
import React from "react";
import { View } from "react-native";

const NotificationsScreen = () => {
  return (
    <View className="bg-[#f9f9f9] h-full ">
      <NotificationList />
    </View>
  );
};

export default NotificationsScreen;
