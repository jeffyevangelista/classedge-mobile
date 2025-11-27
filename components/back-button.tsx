import { RelativePathString, useRouter } from "expo-router";

import { ColorValue, Platform } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { Pressable } from "./ui/pressable";

interface BackButtonProps {
  tintColor?: ColorValue;
  to?: RelativePathString;
}

const BackButton = ({ tintColor, to }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Pressable
      className="rounded w-10 h-10 flex justify-center items-center"
      onPress={() => {
        if (to) {
          router.push(to);
        } else {
          router.back();
        }
      }}
    >
      <ChevronLeftIcon
        strokeWidth={2}
        color={tintColor || "#2287d5"}
        style={{ marginLeft: Platform.OS === "ios" ? -2 : 0 }} // adjust visual centering for iOS
      />
    </Pressable>
  );
};

export default BackButton;
