import { City } from "@/services/mirage";
import { Box, ChakraProps, Flex, Image, Text } from "@chakra-ui/react";

interface ContinentCityProps extends ChakraProps {
  city: City;
}

const ContinentCity = ({ city, ...rest }: ContinentCityProps) => {
  return ( 
    <Flex
      direction="column"
      w="64"
      rounded="lg"
      overflow="hidden"
      {...rest}
    >
      <Box h="40" w="100%">
        <Image src={city.photo} alt={city.name} sizes="cover" w="100%" h="100%" />
      </Box>

      <Flex
        p="6"
        pt={18}
        direction="column"
        gap="3"
        border="1px"
        rounded="lg"
        borderColor="highlight.50"
      >
        <Text color="gray.700" fontWeight="semibold" fontSize="xl">
          {city.name}
        </Text>
        <Text color="gray.400" fontWeight="medium" fontSize="md">
          {city.country}
        </Text>
      </Flex>
    </Flex>
  );
}
 
export default ContinentCity;