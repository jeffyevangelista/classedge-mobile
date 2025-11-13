import FixingBugs from "@/assets/images/illustrations/notify.svg";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text } from "react-native";
import { Box } from "./ui/box";
import { Button, ButtonSpinner, ButtonText } from "./ui/button";
import { VStack } from "./ui/vstack";

const ErrorFallback = ({
  error,
  refetch,
  isRefetching,
}: {
  error: string;
  refetch: () => void;
  isRefetching: boolean;
}) => {
  const router = useRouter();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={[]}
      refreshing={isRefetching}
      onRefresh={refetch}
      renderItem={null}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="w-full max-w-screen-md mx-auto "
      ListEmptyComponent={
        <Box className="h-full flex justify-center items-center">
          <VStack space="lg" className="items-center">
            <FixingBugs height={200} width={200} />

            <Text className="text-2xl font-semibold">Something went wrong</Text>
            {error && <Text className="text-lg text-red-600">{error}</Text>}

            <Button isDisabled={isRefetching} onPress={refetch}>
              {isRefetching && <ButtonSpinner />}
              <ButtonText>Try again</ButtonText>
            </Button>
            <Button
              variant={"link"}
              onPress={() => {
                // Clear the entire navigation stack and navigate to home
                router.dismissAll();
                router.replace("/(main)/(tabs)");
              }}
            >
              <ButtonText>Back to home</ButtonText>
            </Button>
          </VStack>
        </Box>
      }
    />
  );
};

export default ErrorFallback;
