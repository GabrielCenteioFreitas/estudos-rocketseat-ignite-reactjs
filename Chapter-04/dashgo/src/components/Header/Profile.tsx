import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

const Profile = ({ showProfileData }: ProfileProps) => {
  return ( 
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gabriel Freitas</Text>
          <Text color="gray.300" fontSize="small">
            gabriel@rocketseat.com.br
          </Text>
        </Box>
      )}
       
      <Avatar size="md" name="Gabriel Freitas" src="https://github.com/GabrielCenteioFreitas.png" />
    </Flex>
  );
}
 
export default Profile;