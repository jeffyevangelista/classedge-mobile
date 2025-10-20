import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { useWindowDimensions } from "react-native";

const SetupPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { height } = useWindowDimensions();
  return (
    <Box
      style={{
        marginHorizontal: 10,
        gap: 10,
        paddingVertical: 20,
      }}
    >
      <Box>
        <Heading>Set a Password </Heading>
        <Text>Create a secure password to continue </Text>
      </Box>

      <FormControl>
        <Input size={height > 800 ? "xl" : "lg"}>
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
        </Input>
      </FormControl>
      <FormControl>
        <Input size={height > 800 ? "xl" : "lg"}>
          <InputField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </Input>
      </FormControl>

      <Button>
        <ButtonText>Continue</ButtonText>
      </Button>
    </Box>
  );
};

export default SetupPasswordForm;
