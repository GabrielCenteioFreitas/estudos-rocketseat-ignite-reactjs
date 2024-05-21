import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    snow: "#F5F8FA",
    gray: {
      "700": "#47585B",
      "200": "#DADADA"
    },
    highlight: "#FFBA08"
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