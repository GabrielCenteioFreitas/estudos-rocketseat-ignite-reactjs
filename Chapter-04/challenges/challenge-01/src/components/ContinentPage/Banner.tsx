import { Continent } from "@/services/mirage";
import { Box, ChakraProps, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BannerProps extends ChakraProps {
  continent: Pick<Continent, 'name' | 'banner'>;
  children?: ReactNode;
}

const Banner = ({ continent, children, ...rest }: BannerProps) => {
  return ( 
    <Box
      w="100%"
      h={500}
      bgImage={continent.banner}
      bgSize="cover"
      bgPosition="center"
      position="relative"
      zIndex={-2}
      {...rest}
    >
      <Text
        position="absolute"
        left={140}
        bottom={59}
        color="snow"
        fontWeight="semibold"
        fontSize="5xl"
      >
        {continent.name}
      </Text>

      <Box
        position="absolute"
        zIndex={-1}
        w="100%"
        h="100%"
        bgColor="black"
        opacity="40%"
      />
    </Box>
  );
}
 
export default Banner;