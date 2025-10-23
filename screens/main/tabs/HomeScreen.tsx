import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { CopilotStep, walkthroughable, useCopilot } from "react-native-copilot";

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);
const CopilotTouchableOpacity = walkthroughable(TouchableOpacity);

const HomeScreen = () => {
  const { start, stop, visible } = useCopilot();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <CopilotStep
          text="Welcome to ClassEdge! This is your home screen where you'll find all your important information."
          order={1}
          name="welcome"
        >
          <CopilotView style={styles.header}>
            <Text style={styles.title}>Welcome to ClassEdge</Text>
            <Text style={styles.subtitle}>Your learning journey starts here</Text>
          </CopilotView>
        </CopilotStep>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <CopilotStep
            text="Tap this button to start the guided tour anytime you need help navigating the app."
            order={2}
            name="startTour"
          >
            <CopilotTouchableOpacity
              style={styles.button}
              onPress={() => start()}
            >
              <Text style={styles.buttonText}>Start Tour</Text>
            </CopilotTouchableOpacity>
          </CopilotStep>

          <CopilotStep
            text="Use this button to stop the tour if you want to explore on your own."
            order={3}
            name="stopTour"
          >
            <CopilotTouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => stop()}
            >
              <Text style={styles.buttonText}>Stop Tour</Text>
            </CopilotTouchableOpacity>
          </CopilotStep>
        </View>

        {/* Feature Cards */}
        <CopilotStep
          text="Here you'll find your recent classes and assignments."
          order={4}
          name="recentActivity"
        >
          <CopilotView style={styles.card}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            <Text style={styles.cardContent}>Your latest classes and assignments will appear here</Text>
          </CopilotView>
        </CopilotStep>

        <CopilotStep
          text="Check your upcoming schedule and deadlines in this section."
          order={5}
          name="schedule"
        >
          <CopilotView style={styles.card}>
            <Text style={styles.cardTitle}>Schedule</Text>
            <Text style={styles.cardContent}>View your upcoming classes and events</Text>
          </CopilotView>
        </CopilotStep>

        <CopilotStep
          text="Track your progress and achievements here."
          order={6}
          name="progress"
        >
          <CopilotView style={styles.card}>
            <Text style={styles.cardTitle}>Progress</Text>
            <Text style={styles.cardContent}>Monitor your learning progress and achievements</Text>
          </CopilotView>
        </CopilotStep>

        <CopilotStep
          text="After this, we'll show you the navigation tabs at the bottom of the screen to help you explore different sections of the app."
          order={7}
          name="tabsIntro"
        >
          <CopilotView style={styles.card}>
            <Text style={styles.cardTitle}>Navigation</Text>
            <Text style={styles.cardContent}>Use the tabs at the bottom to navigate between different sections</Text>
          </CopilotView>
        </CopilotStep>

        {/* Status Info */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Tour Status: {visible ? "Active" : "Inactive"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: "#4A90E2",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#7B68EE",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  statusContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});

export default HomeScreen;
