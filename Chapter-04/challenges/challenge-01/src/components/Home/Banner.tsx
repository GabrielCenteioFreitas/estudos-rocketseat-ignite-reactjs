import { Flex, Text, Image, ChakraProps, useBreakpointValue } from "@chakra-ui/react";

interface BannerProps extends ChakraProps {}

const Banner = ({ ...rest }: BannerProps) => {
  const isWebVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  return ( 
    <Flex
      w="100%"
      bgImage="/images/banner-home.png"
      bgSize="cover"
      justify="space-between"
      alignItems="center"
      position="relative"
      px={{base: "4", xl: 140}}
      pt={{base: "7", xl: "20"}}
      pb={{base: "7", xl: 70}}
      {...rest}
    >
      <Flex direction="column" gap={{base: "2", xl: "5"}}>
        <Text
          color="snow"
          fontSize={{base: "xl", xl: "4xl"}}
          fontWeight="medium"
        >
          5 Continentes,<br />
          infinitas possibilidades.
        </Text>

        <Text
          color="gray.200"
          fontSize={{base: "sm", xl: "xl"}}
          fontWeight="normal"
        >
          {isWebVersion ? (
            <Text>Chegou a hora de tirar do papel a viagem que você<br />sempre sonhou. "</Text>
          ) : (
            <Text>Chegou a hora de tirar do papel a viagem que você sempre sonhou. "</Text>
          )}
        </Text>
      </Flex>

      {isWebVersion && (
        <Image 
          src="/images/airplane.svg"
          alt="Airplane"
          position="absolute"
          right={140}
          top={76}
        />
      )}
    </Flex>
  );
}
 
export default Banner;