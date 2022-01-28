import Head from 'next/head'
import Navbar from '../navbar'
import NoSsr from '../no-ssr'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import Planet from '../planet'
import Footer from '../footer'
import Contact from '../contact'

const Main = ({ children, router, }) => {
  const color = useColorModeValue('#f0e7db', '#202023')
  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={color} />
        <meta name="google-site-verification" content="d-pB_seNFDrB08QpbqIAyJx9Oot3VCDQ9txyzd9xGPU" />
        <title>Valerian Lukashyk - Full-stack interactive developer</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.3xl" pt={14} >
        <NoSsr>
          <Planet />
        </NoSsr>
        <Contact/>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}

export default Main
