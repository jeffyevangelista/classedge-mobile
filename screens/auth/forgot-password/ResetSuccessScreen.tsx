import Celebrating from "@/assets/images/celebrating.svg";
import Screen from "@/components/screen";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

const SuccessScreen = () => {
  const { height, width } = useWindowDimensions();
  const verticalSpacing = height > 800 ? 64 : 32;
  return (
    <Screen withPadding={false} safeArea>
      <View
        style={[
          styles.container,
          { paddingTop: verticalSpacing, paddingBottom: verticalSpacing / 2 },
        ]}
      >
        <Celebrating
          width={width * 0.7}
          height={height * 0.35}
          style={styles.image}
        />
        <Heading className="text-2xl font-semibold mb-2 text-center">
          Reset Password Success
        </Heading>
        <Text className="text-gray-500 text-center mb-8 max-w-md self-center">
          Now, you can use your new password to login to your account.
        </Text>
        <Link href="/(auth)/login" asChild>
          <Button size={height > 800 ? "xl" : "lg"} className="mt-2">
            <ButtonText>Go to Login</ButtonText>
          </Button>
        </Link>
      </View>
    </Screen>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  image: {
    marginBottom: 24,
  },
});
