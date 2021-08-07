import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}


export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Cainã Gonçalves</Text>
          <Text color="gray.300" fontSize="small">
            moaraadrean@gmail.com
          </Text>
        </Box>
      )}


      <Avatar size="md" name="Cainã Gonçalves" src="https://github.com/cainamagoncalves.png" />
    </Flex>
  );
}