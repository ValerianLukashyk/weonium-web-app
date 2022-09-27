import Head from 'next/head'
import Navbar from '../navbar'
import NoSsr from '../no-ssr'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import Planet from '../planet'
import Footer from '../footer'
import Contact from '../contact'
import { useEffect } from 'react'

const Main = ({ children, router, }) => {
  const color = useColorModeValue('#f0e7db', '#202023')

  useEffect(() => {
    fetch('https://www.googletagmanager.com/gtag/js?id=UA-218854758-1')
    window.dataLayer = window.dataLayer || []
    const gtag = () => { 
      dataLayer.push(arguments) 
    }
    gtag('js', new Date());

    gtag('config', 'UA-218854758-1');
  }, [])

  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={color} />
        <meta name="description" content="Hire me - Fullstack interactive web developer. I'm working with JS (node, react, next, vue) and WebGL 3D animations using three.js and GLSL."></meta>
        <meta name="google-site-verification" content="d-pB_seNFDrB08QpbqIAyJx9Oot3VCDQ9txyzd9xGPU" />
        <title>Full-stack interactive developer - Portfolio - Valerian Lukashyk - JS, Node, React, Next, Three, GLSL </title>

      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.3xl" pt={14} >
        <NoSsr>
          <Planet />
        </NoSsr>
        <Contact />
        {children}
      </Container>
      <Footer />
    </Box>
  )
}

export default Main
