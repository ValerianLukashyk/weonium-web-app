import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#f0e7db', '#202023')(props)
    }
  })
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'Poppins'"
}

const colors = {
  glassTeal: '#88ccca',
  lime: {
    50: '#f2ffde',
    100: '#defcb2',
    200: '#caf884',
    300: '#b5f554',
    400: '#a1f226',
    500: '#88d90d',
    600: '#69a905',
    700: '#4a7801',
    800: '#2b4800',
    900: '#0b1900',
  },
  solidBlue: {
    50: '#def6ff',
    100: '#afdcff',
    200: '#7dc0ff',
    300: '#4ba0ff',
    400: '#1a7eff',
    500: '#005de6',
    600: '#0054b4',
    700: '#004482',
    800: '#002f51',
    900: '#001321',
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts
})

export default theme
