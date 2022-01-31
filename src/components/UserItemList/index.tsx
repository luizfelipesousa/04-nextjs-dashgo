import {
  Box,
  Button,
  Checkbox,
  Icon,
  Td,
  Tr,
  Text,
  Link,
  LinkProps,
} from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";

interface UserItemListProps extends LinkProps {
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
  ...rest
}: UserItemListProps) {
  return (
    <Tr>
      <Td px={["4", "4", "6"]}>
        <Checkbox colorScheme="pink" />
      </Td>
      <Td>
        <Box>
          <Link color="pink.500" {...rest}>
            <Text fontWeight="bold">{name}</Text>
          </Link>
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
