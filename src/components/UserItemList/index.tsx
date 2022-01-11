import { Box, Button, Checkbox, Icon, Td, Tr, Text } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";

interface UserItemListProps {
  name: string;
  email: string;
  date: string;
  isWide?: boolean;
}

export function UserItemList({
  name,
  email,
  date,
  isWide = true,
}: UserItemListProps) {
  return (
    <Tr>
      <Td px={["4", "4", "6"]}>
        <Checkbox colorScheme="pink" />
      </Td>
      <Td>
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="gray.300">
            {email}
          </Text>
        </Box>
      </Td>
      {isWide && <Td>{date}</Td>}
      <Td>
        {isWide ? (
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="purple"
            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
          >
            Editar
          </Button>
        ) : (
          <Button as="a" size="sm" fontSize="sm" colorScheme="purple">
            <Icon as={RiPencilLine} fontSize="16" />
          </Button>
        )}
      </Td>
    </Tr>
  );
}
