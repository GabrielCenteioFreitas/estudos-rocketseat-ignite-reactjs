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
      h={{base: 150, xl: 500}}
      bgImage={continent.banner}
      bgSize="cover"
      bgPosition="center"
      position="relative"
      zIndex={-2}
      {...rest}
    >
      <Text
        position="absolute"
        left={{base: "50%", xl: 140}}
        bottom={{base: "50%", xl: 59}}
        transform="translate(-50%, 50%)"
        color="snow"
        fontWeight="semibold"
        fontSize={{base: "3xl", xl: "5xl"}}
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