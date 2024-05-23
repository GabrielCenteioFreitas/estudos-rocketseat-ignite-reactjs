import { ChakraProps, Box, SimpleGrid } from "@chakra-ui/react";
import TravelType from "./TravelType";

interface TravelTypesProps extends ChakraProps {}

const TravelTypes = ({ ...rest }: TravelTypesProps) => {  
  return ( 
    <Box
      w="100%"
      px={{base: 50, xl: 140}}
      color="gray.700"
      fontWeight="semibold"
      fontSize="2xl"
      {...rest}
    >
      <SimpleGrid
        w="100%"
        templateColumns={{base: "repeat(2, 1fr)", xl: "repeat(5, 1fr)"}}
        templateRows={{base: "repeat(3, 1fr)", xl: "repeat(1, 1fr)"}}
        alignItems="center"
        justifyItems="space-center"
        gap={0}
        rowGap="6"
      >
        <TravelType
          src="/images/cocktail.svg"
          text="vida noturna"
        />

        <TravelType
          src="/images/surf.svg"
          text="praia"
          gridItem={{ml: {base: "auto", xl: "0"}}}
        />

        <TravelType
          src="/images/building.svg"
          text="moderno"
        />

        <TravelType
          src="/images/museum.svg"
          text="clássico"
          gridItem={{ml: {base: "auto", xl: "0"}}}
        />

        <TravelType
          src="/images/earth.svg"
          text="e mais..."
          gridItem={{colSpan: {base: 2, xl: 1}}}
          flex={{justify: "center"}}
        />
      </SimpleGrid>
    </Box>
  );
}
 
export default TravelTypes;