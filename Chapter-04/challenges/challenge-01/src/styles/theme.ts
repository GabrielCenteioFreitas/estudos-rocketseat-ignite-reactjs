import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    snow: "#F5F8FA",
    gray: {
      "700": "#47585B",
      "400": "#999999",
      "200": "#DADADA"
    },
    highlight: {
      "900": "#FFBA08",
      "50": "#FFBA0850",
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
  styles: {
    global: {
      body: {
        bg: 'snow',
        color: 'gray.700'
      }
    }
  }
})