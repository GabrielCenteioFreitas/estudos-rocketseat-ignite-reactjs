import Container from "@/components/Container";
import Banner from "@/components/ContinentPage/Banner";
import ContinentCities from "@/components/ContinentPage/ContinentCities";
import ContinentInfos from "@/components/ContinentPage/ContinentInfos";
import Header from "@/components/Header";
import { api } from "@/services/api";
import { Continent } from "@/services/mirage";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FaChevronLeft } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import Link from "next/link";

interface ContinentPageProps {
  slug: string;
}

const ContinentPage = ({ slug }: ContinentPageProps) => {
  const [continent, setContinent] = useState<Continent>({} as Continent)

  const continentResponse = useQuery(['continent', slug], async () => {
    const response = await api.get(`/continents/${slug}`)

    return response.data
  }, { 
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  useEffect(() => {
    if (continentResponse.data) {
      setContinent(continentResponse.data?.continent)
    } 
  }, [continentResponse.data])
  
  return ( 
    <>
      <Head>
        {continent.name}
      </Head>
      <Container>
        <Header position="relative">
          <Link href="/">
            <Icon as={FaChevronLeft} position="absolute" left={140} top="50%" transform="translateY(-50%)" />
          </Link>
        </Header>

        <Banner continent={continent} />

        <ContinentInfos continent={continent} mt="20" />

        <ContinentCities cities={continent.cities} mt="20" />
      </Container>
    </>
  );
}
 
export default ContinentPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug

  return {
    props: {
      slug
    }
  }
}