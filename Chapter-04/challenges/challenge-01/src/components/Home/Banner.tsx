import { Flex, Text, Image, ChakraProps } from "@chakra-ui/react";

interface BannerProps extends ChakraProps {}

const Banner = ({ ...rest }: BannerProps) => {
  return ( 
    <Flex
      w="100%"
      bgImage="/images/banner-home.png"
      bgSize="cover"
      justify="space-between"
      alignItems="center"
      position="relative"
      px={140}
      pt="20"
      pb={70}
      {...rest}
    >
      <Flex direction="column" gap="5">
        <Text
          color="snow"
          fontSize="4xl"
          fontWeight="medium"
        >
          5 Continentes,<br />
          infinitas possibilidades.
        </Text>

        <Text
          color="gray.200"
          fontSize="xl"
          fontWeight="normal"
        >
          Chegou a hora de tirar do papel a viagem que você<br />sempre sonhou. 
        </Text>
      </Flex>

      <Image 
        src="/images/airplane.svg"
        alt="Airplane"
        position="absolute"
        right={140}
        top={76}
      />
    </Flex>
  );
}
 
export default Banner;