import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const response = await api.get('/api/images', {
        params: {
          after: pageParam
        }
      })

      return response.data
    },
    {
      getNextPageParam:(response) => response.data.after
    }
  );

  const formattedData = useMemo(() => {
    const dataPages = data?.pages.map(page => page.data)
    const dataPagesFlatted = dataPages?.flat()

    return dataPagesFlatted
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        
        {hasNextPage && (
          <Button
            py={10}
            px="4"
            bg="orange.500"
            rounded="lg"
            fontWeight="bold"
            fontSize="md"
            color="gray.50"
            onClick={() => fetchNextPage()}
          >
            {!isFetchingNextPage
              ? "Carregar mais"
              : "Carregando..."
            }
          </Button>
        )}
      </Box>
    </>
  );
}
