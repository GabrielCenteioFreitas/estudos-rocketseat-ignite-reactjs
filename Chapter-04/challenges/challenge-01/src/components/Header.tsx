import { ChakraProps, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps extends ChakraProps {
  children?: ReactNode;
}

const Header = ({ children, ...rest }: HeaderProps) => {
  return ( 
    <Flex as="header" p={{base: "4", xl: "7"}} justify="center" w="100%" {...rest}>
      {children}
      <Link href="/">
        <Image src="/logo.svg" alt="worldtrip" w={{base: "50%", xl: "100%"}} mx="auto" />
      </Link>
    </Flex>
  );
}
 
export default Header;