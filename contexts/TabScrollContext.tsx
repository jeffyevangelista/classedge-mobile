import { createContext, useContext } from "react";
import { SharedValue } from "react-native-reanimated";

export interface TabScrollContextType {
  scrollY: SharedValue<number>;
}

export const TabScrollContext = createContext<TabScrollContextType | null>(null);

export const useTabScrollContext = () => {
  const context = useContext(TabScrollContext);
  if (!context) {
    throw new Error("useTabScrollContext must be used within TabScrollContext.Provider");
  }
  return context;
};
