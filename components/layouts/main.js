import Head from 'next/head'
import Navbar from '../navbar'
import NoSsr from '../no-ssr'
import { Box, Container } from '@chakra-ui/react'
import Planet from '../planet'
import Footer from '../footer'
import Contact from '../contact'

const Main = ({ children, router, }) => {

  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
