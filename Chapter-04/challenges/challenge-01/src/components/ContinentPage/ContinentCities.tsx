import { City } from "@/services/mirage";
import { ChakraProps, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import ContinentCity from "./ContinentCity";

interface ContinentCitiesProps extends ChakraProps {
  cities: City[];
}

const ContinentCities = ({ cities, ...rest }: ContinentCitiesProps) => {
  return ( 
    <Flex direction="column" gap="10" w="100%" px={140} {...rest}>
      <Text color="gray.700" fontWeight="medium" fontSize="4xl">
        Cidades +100
      </Text>

      <SimpleGrid minChildWidth="256px" gap="10">
        {cities?.map(city => 
          <ContinentCity key={city.name} city={city} />
        )}
      </SimpleGrid>
    </Flex>
  );
}
 
export default ContinentCities;