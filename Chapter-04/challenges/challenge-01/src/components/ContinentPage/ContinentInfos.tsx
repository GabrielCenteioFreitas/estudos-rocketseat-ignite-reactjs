import { Continent } from "@/services/mirage";
import { ChakraProps, Flex, Text } from "@chakra-ui/react";
import ContinentInfosNumbers from "./ContinentInfosNumbers";

interface ContinentInfosProps extends ChakraProps {
  continent: Pick<Continent, "long_description" | "countries" | "languages" | "cities_plus_100">;
}

const ContinentInfos = ({ continent, ...rest }: ContinentInfosProps) => {
  return ( 
    <Flex align="center" w="100%" gap={70} px={140} {...rest} >
      <Text maxW={600} textAlign="justify" textIndent="24px" fontSize="xl" color="gray.700">
        {continent.long_description}
      </Text>

      <Flex gap={42}>
        <ContinentInfosNumbers name="países" number={continent.countries} />

        
        <ContinentInfosNumbers name="idiomas" number={continent.languages} />

        
        <ContinentInfosNumbers
          name="cidades +100"
          number={continent.cities_plus_100}
          extraInfo
          extraInfoText="Cidades do continente que estão entre as 100 mais visitadas do mundo."
        />
      </Flex>
    </Flex>
  );
}
 
export default ContinentInfos;