import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { ArrowRightStartOnRectangleIcon } from "react-native-heroicons/outline";
import { useLogout } from "../auth.hooks";
const LogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { mutateAsync: logout, isPending } = useLogout();
  return (
    <>
      <Button
        variant={"link"}
        action={"negative"}
        onPress={() => setShowModal(true)}
        className=" items-center justify-center flex h-10 w-10"
      >
        <ButtonIcon as={ArrowRightStartOnRectangleIcon} className="w-7 h-7" />
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Are you sure you want to log out?</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>You’ll need to log in again to access your account.</Text>
          </ModalBody>
          <ModalFooter className="flex flex-col">
            <Button
              isDisabled={isPending}
              className="w-full"
              action={"negative"}
              onPress={async () => {
                await logout();
                setShowModal(false);
              }}
            >
              <ButtonText>Yes, log out</ButtonText>
            </Button>
            <Button
              className="w-full"
              variant={"outline"}
              action={"secondary"}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutButton;
