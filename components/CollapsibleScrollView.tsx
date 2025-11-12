import React, { createContext, useContext } from "react";
import { ViewStyle } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";

interface ScrollContextType {
  scrollY: SharedValue<number>;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within CollapsibleScrollView");
  }
  return context;
};

interface CollapsibleScrollViewProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
}

const CollapsibleScrollView: React.FC<CollapsibleScrollViewProps> = ({
  children,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
}) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      >
        {children}
      </Animated.ScrollView>
    </ScrollContext.Provider>
  );
};

export default CollapsibleScrollView;
