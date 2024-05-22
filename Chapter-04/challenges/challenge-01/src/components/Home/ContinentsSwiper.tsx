import { Flex, Box, Text, ChakraProps } from "@chakra-ui/react";

import { continentsInfos } from "../../../public/lib/staticContinentsInfos";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ContinentsSwiper = ({ ...rest }: ChakraProps) => {
  return ( 
    <Box w="100%" h={450} px={100} {...rest}>
      <Flex
        as={Swiper} h="100%" w="100%" color="gray.200" fontSize="5xl" justify="center"
        navigation
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        spaceBetween={10}
      >
        {continentsInfos.map(continentInfo => 
          <SwiperSlide key={continentInfo.continent}>
            <Flex
              w="100%"
              h="100%"
              bg="gray.700"
              align="center"
              justify="center"
              direction="column"
              gap="4"
              bgImage={continentInfo.photo}
              bgSize="cover"
              bgPosition="center"
              position="relative"
              zIndex={-2}
            >
              <Text
                fontWeight="bold"
                fontSize="5xl"
                color="snow"
              >
                {continentInfo.continent}
              </Text>
              <Text
                fontWeight="bold"
                fontSize="2xl"
                color="gray.200"
              >
                {continentInfo.description}
              </Text>

              <Box
                position="absolute"
                zIndex={-1}
                w="100%"
                h="100%"
                bgColor="black"
                opacity="70%"
              />
            </Flex>
          </SwiperSlide>
        )}
      </Flex>
    </Box>
  );
}
 
export default ContinentsSwiper;