import type { AppProps } from "next/app";

import { makeServer } from "@/services/mirage";

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from "@/styles/theme";
import "@/styles/styles.css";

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
