import LogoutButton from "@/features/auth/components/LogoutButton";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SubjectsLayout = () => {
  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold",
            color: "#000",
          },
          headerTintColor: "#2287d5",
          headerStyle: {
            backgroundColor: "#f9f9f9",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerRight: () => <LogoutButton />,
          drawerItemStyle: {
            borderRadius: 5,
          },
          drawerActiveTintColor: "#2287d5",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: "Subjects",
            drawerLabel: "Subjects",
          }}
        />
        <Drawer.Screen
          name="coil"
          options={{
            headerTitle: "COIL Program",
            drawerLabel: "COIL Program",
          }}
        />
        <Drawer.Screen
          name="hali"
          options={{
            headerTitle: "HALI Program",
            drawerLabel: "HALI Program",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default SubjectsLayout;
