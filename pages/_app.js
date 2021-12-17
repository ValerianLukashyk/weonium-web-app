import { useEffect } from 'react'
import useStore from '../state/useStore'
import { server } from '../components/api/api'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import theme from '../libs/theme'
import '../styles/styles.css'
import { AnimatePresence } from 'framer-motion'


const Website = ({ Component, pageProps, router }) => {
  const setAuthInfo = useStore(state => state.setAuthInfo)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      server.defaults.headers.common['auth-token'] = token
      server.get('/auth/me')
        .then((res) => {
          if (res.status === 200) setAuthInfo(res.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }, [setAuthInfo])

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence exitBeforeEnter initial={true}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  )
}

export default Website
