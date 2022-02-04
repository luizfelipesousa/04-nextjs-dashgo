import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
  email: string;
}

export default function Profile({
  showProfileData = true,
  email,
}: ProfileProps) {
  const { signOut } = useContext(AuthContext);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Luiz Felipe</Text>
          <Text color="gray.300" fontSize="small">
            {email}
          </Text>
        </Box>
      )}
      <Button bg="transparent" size="sm" variant="link" onClick={signOut}>
        <Avatar size="md" name="Luiz Felipe" />
      </Button>
    </Flex>
  );
}
