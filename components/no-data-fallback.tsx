import NoDataIllustration from "@/assets/images/illustrations/no-data.svg";
import React from "react";
import { FlatList, Text } from "react-native";
import { Box } from "./ui/box";
import { Button, ButtonSpinner, ButtonText } from "./ui/button";
import { VStack } from "./ui/vstack";

const NoDataFallback = ({
  message = "No data found",
  refetch,
  isRefetching,
}: {
  message?: string;
  refetch: () => void;
  isRefetching: boolean;
}) => {
  return (
    <FlatList
      data={[]}
      refreshing={isRefetching}
      onRefresh={refetch}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="w-full max-w-screen-md mx-auto"
      ListEmptyComponent={
        <Box className="h-full flex justify-center items-center">
          <VStack space="lg" className="items-center">
            <NoDataIllustration width={200} height={200} />

            <Text className="text-2xl font-semibold">{message}</Text>

            <Button isDisabled={isRefetching} onPress={refetch}>
              {isRefetching && <ButtonSpinner />}
              <ButtonText>Refresh</ButtonText>
            </Button>
          </VStack>
        </Box>
      }
    />
  );
};

export default NoDataFallback;
