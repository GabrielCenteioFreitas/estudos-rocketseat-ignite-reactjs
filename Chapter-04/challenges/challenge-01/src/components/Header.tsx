import { ChakraProps, Flex } from "@chakra-ui/react";

interface HeaderProps extends ChakraProps {}

const Header = ({ ...rest }: HeaderProps) => {
  return ( 
    <Flex as="header" p="7" justify="center" {...rest}>
      <img src="/logo.svg" alt="worldtrip" />
    </Flex>
  );
}
 
export default Header;