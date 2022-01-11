import { Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      letterSpacing="tight"
      fontWeight="bold"
      w="64"
    >
      dashgo
      <Text color="pink.500" ml="1" as="span">
        .
      </Text>
    </Text>
  );
}
