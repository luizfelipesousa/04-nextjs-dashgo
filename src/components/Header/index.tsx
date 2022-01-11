import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSideBarContext } from "../../contexts/SideBarContext";
import Logo from "./Logo";
import Notifications from "./Notifications";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { onOpen } = useSideBarContext();

  return (
    <Flex
      as="header"
      maxWidth={1480}
      w="100%"
      h="20"
      mx="auto"
      px="6"
      mt="4"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="2xl"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}
      <Logo />
      {isWideVersion && <SearchBar />}
      <Notifications />
      <Profile showProfileData={isWideVersion} />
    </Flex>
  );
}
