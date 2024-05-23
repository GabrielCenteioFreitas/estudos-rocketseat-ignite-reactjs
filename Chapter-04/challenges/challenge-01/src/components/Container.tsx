import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return ( 
    <Flex direction="column" maxW={{base: 375, xl: 1440}} w="100vw" mx="auto" align="center">
      {children}
    </Flex>
  );
}
 
export default Container;