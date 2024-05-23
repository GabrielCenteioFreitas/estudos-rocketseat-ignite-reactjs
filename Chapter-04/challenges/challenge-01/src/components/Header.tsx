import { ChakraProps, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps extends ChakraProps {
  children?: ReactNode;
}

const Header = ({ children, ...rest }: HeaderProps) => {
  return ( 
    <Flex as="header" p="7" justify="center" w="100%" {...rest}>
      {children}
      <Link href="/">
        <img src="/logo.svg" alt="worldtrip" />
      </Link>
    </Flex>
  );
}
 
export default Header;