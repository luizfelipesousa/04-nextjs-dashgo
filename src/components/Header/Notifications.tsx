import { Flex, HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export default function Notifications() {
  return (
    <Flex align="center" ml="auto">
      <HStack
        spacing={["6", "8"]}
        mx={["6", "8"]}
        pr={["6", "8"]}
        borderRightWidth={1}
        borderRightColor="gray.700"
        color="gray.300"
      >
        <Icon as={RiNotificationLine} fontSize="20" />
        <Icon as={RiUserAddLine} fontSize="20" />
      </HStack>
    </Flex>
  );
}
