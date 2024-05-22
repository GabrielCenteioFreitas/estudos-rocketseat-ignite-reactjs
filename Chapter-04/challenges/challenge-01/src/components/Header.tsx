import { ChakraProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface HeaderProps extends ChakraProps {
  children?: ReactNode;
}

const Header = ({ children, ...rest }: HeaderProps) => {
  return ( 
    <Flex as="header" p="7" justify="center" {...rest}>
      {children}
      <img src="/logo.svg" alt="worldtrip" />
    </Flex>
  );
}
 
export default Header;