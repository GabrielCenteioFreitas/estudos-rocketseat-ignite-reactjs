import { Flex, Text, Image, ChakraProps } from "@chakra-ui/react";

interface TravelTypesProps extends ChakraProps {}

const TravelTypes = ({ ...rest }: TravelTypesProps) => {
  return ( 
    <Flex
      w="100%"
      justify="space-center"
      alignItems="center"
      gap={140}
      px={140}
      position="relative"
      color="gray.700"
      fontWeight="semibold"
      fontSize="2xl"
      {...rest}
    >
      <Flex direction="column" gap="6" align="center">
        <Image src="/images/cocktail.svg" w={85} h={85} />
        <Text>vida noturna</Text>
      </Flex>

      <Flex direction="column" gap="6" align="center">
        <Image src="/images/surf.svg" w={85} h={85} />
        <Text>praia</Text>
      </Flex>
      
      <Flex direction="column" gap="6" align="center">
        <Image src="/images/building.svg" w={85} h={85} />
        <Text>moderno</Text>
      </Flex>
      
      <Flex direction="column" gap="6" align="center">
        <Image src="/images/museum.svg" w={85} h={85} />
        <Text>clássico</Text>
      </Flex>
      
      <Flex direction="column" gap="6" align="center">
        <Image src="/images/earth.svg" w={85} h={85} />
        <Text>e mais</Text>
      </Flex>
    </Flex>
  );
}
 
export default TravelTypes;