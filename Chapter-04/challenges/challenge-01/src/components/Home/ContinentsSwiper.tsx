import { Flex, Box, Text, ChakraProps } from "@chakra-ui/react";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Continent } from "@/services/mirage";
import Link from "next/link";

const ContinentsSwiper = ({ ...rest }: ChakraProps) => {
  const [continentsInfos, setContinentsInfos] = useState<Continent[]>([] as Continent[])

  useEffect(() => {
    const fetch = async () => {
      const response = await api
        .get('/continents')
      setContinentsInfos(response.data.continents)
    }

    fetch()
  }, [])

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
          <SwiperSlide key={continentInfo.slug}>
            <Link href={`/continents/${continentInfo.slug}`}>
              <Flex
                w="100%"
                h="100%"
                bg="gray.700"
                align="center"
                justify="center"
                direction="column"
                gap="4"
                bgImage={continentInfo.banner}
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
                  {continentInfo.name}
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                  color="gray.200"
                >
                  {continentInfo.short_description}
                </Text>

                <Box
                  position="absolute"
                  zIndex={-1}
                  w="100%"
                  h="100%"
                  bgColor="black"
                  opacity="40%"
                />
              </Flex>
            </Link>
          </SwiperSlide>
        )}
      </Flex>
    </Box>
  );
}
 
export default ContinentsSwiper;