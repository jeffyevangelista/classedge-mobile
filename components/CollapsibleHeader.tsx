import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CollapsibleHeaderProps {
  title: string;
  scrollY: SharedValue<number>;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
}

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({
  title,
  scrollY,
  headerRight,
  headerLeft,
}) => {
  const insets = useSafeAreaInsets();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP
    );

    return {
      height: height + insets.top,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [34, 17],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -10],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [1, 0.8, 1],
      Extrapolation.CLAMP
    );

    return {
      fontSize,
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.header,
        headerAnimatedStyle,
        { paddingTop: insets.top },
      ]}
    >
      <View style={styles.headerContent}>
        <View style={styles.headerTop}>
          {headerLeft && <View style={styles.headerLeft}>{headerLeft}</View>}
          <View style={styles.headerRightContainer}>
            {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
          </View>
        </View>
        <Animated.Text
          style={[styles.title, titleAnimatedStyle]}
          numberOfLines={1}
        >
          {title}
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    fontWeight: "600",
  },
});

export default CollapsibleHeader;
