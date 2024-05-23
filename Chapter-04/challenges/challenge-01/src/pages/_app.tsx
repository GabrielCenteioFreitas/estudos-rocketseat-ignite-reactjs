import type { AppProps } from "next/app";

import { makeServer } from "@/services/mirage";

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from "@/styles/theme";
import "@/styles/styles.css";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from "@/services/queryClient";

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
