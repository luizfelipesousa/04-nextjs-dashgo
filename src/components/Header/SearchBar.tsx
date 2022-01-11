import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

export default function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={480}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        variant="unstyled"
        color="gray.50"
        label="Buscar na plataforma"
        mr="4"
        px="4"
        _placeholder={{
          color: "gray.400",
        }}
        ref={searchInputRef}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
