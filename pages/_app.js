import { useEffect } from 'react'
import useStore from '../state/useStore'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import theme from '../libs/theme'
import '../styles/styles.css'
import { AnimatePresence } from 'framer-motion'

const Website = ({ Component, pageProps, router }) => {
    const fetchAuthInfo = useStore(state => state.fetchAuthInfo)

    useEffect(() => {
        fetchAuthInfo()
    }, [fetchAuthInfo])

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
