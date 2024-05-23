import { Box, ChakraProps, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

interface ContinentInfosNumberProps extends ChakraProps {
  name: string;
  number: number;
  extraInfo?: boolean;
  extraInfoText?: string;
}

const ContinentInfosNumbers = ({ name, number, extraInfo=false, extraInfoText, ...rest }: ContinentInfosNumberProps) => {
  return ( 
    <Flex direction="column" gap={0} align={{base: "start", xl: "center"}} {...rest}>
      <Text color="highlight.900" fontWeight="semibold" fontSize={{base: "2xl", xl: "5xl"}}>
        {number}
      </Text>
      <Flex color="gray.700" fontWeight={{base: "regular", xl: "semibold"}} fontSize={{base: "md", xl: "2xl"}} gap="1" align="center">
        <Text>
          {name}
        </Text>

        {extraInfo && (
          <Tooltip
            hasArrow
            label={extraInfoText}
            aria-label='A tooltip'
            bg="gray.800"
            color="gray.200"
            borderRadius="4"
            placement='right'
          >
            <span>
            <Icon
              as={FiInfo}
              color="gray.700"
              opacity="50%"
              w={{base: "10px", xl: "5"}}
              h={{base: "10px", xl: "5"}}
            />
            </span>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
}
 
export default ContinentInfosNumbers;