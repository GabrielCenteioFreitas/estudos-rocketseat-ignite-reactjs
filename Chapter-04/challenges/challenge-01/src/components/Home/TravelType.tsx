import { Box, ChakraProps, Flex, FlexProps, GridItem, GridItemProps, Image, Text, useBreakpointValue } from "@chakra-ui/react";

interface TravelTypeProps {
  src: string;
  text: string;
  gridItem?: GridItemProps;
  flex?: FlexProps;
}

const TravelType = ({ src, text, gridItem, flex }: TravelTypeProps) => {
  const isWebVersion = useBreakpointValue({
    base: false,
    xl: true
  })

  return ( 
    <GridItem {...gridItem}>
      <Flex
        direction={{base: "row", xl: "column"}}
        gap={{base: 2, xl: "6"}}
        align={{base: "baseline", xl: "center"}}
        {...flex}
      >
        {isWebVersion ? (
          <Image src={src} w={85} h={85} />
        ) : (
          <Box w="2" h="2" bgColor="highlight.900" flexShrink={0} rounded="full" />
        )}
        <Text fontWeight="semibold" fontSize={{base: "lg", xl: "2xl"}} color="gray.700">
          {text}
        </Text>
      </Flex>
    </GridItem>
  );
}
 
export default TravelType;