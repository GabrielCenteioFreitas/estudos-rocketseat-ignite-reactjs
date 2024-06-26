import Container from "@/components/Container";
import Header from "@/components/Header";
import Banner from "@/components/Home/Banner";
import ContinentsSwiper from "@/components/Home/ContinentsSwiper";
import TravelTypes from "@/components/Home/TravelTypes";
import { Text, Box } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <Header />

        <Banner />

        <TravelTypes mt={{base: "9", xl: 115}} />

        <Box mt={{base: "9", xl: "20"}} w={90} h="0.5" bg="gray.700" />

        <Text
          color="gray.700"
          fontWeight="medium"
          fontSize={{base: "xl", xl: "4xl"}}
          textAlign="center"
          mt={{base: "6", xl: "14"}}
        >
          Vamos nessa?<br />
          Então escolha seu continente
        </Text>

        <ContinentsSwiper mt={{base: "5", xl: "14"}} mb={{base: "6", xl: "10"}} />
      </Container>
    </>
  );
}
