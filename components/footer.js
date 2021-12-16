// import useStore from '../state/useStore'
import Logo from './logo'
// import NextLink from 'next/link'
import {
    Container,
    Box,

    Heading,
    Flex,

    useColorModeValue
} from '@chakra-ui/react'

const Footer = (props) => {

    return (
        <Box

            p={6}
            w="100%"
            bg={useColorModeValue('#ffffff40', '#1a191c80')}
            style={{ backdropFilter: 'blur(10px)' }}
            zIndex={1}
            {...props}
        >
            <Container
                display="flex"
                p={2}
                maxW="container.md"
                wrap="wrap"
                align="center"
                justify="space-between"
            >
                <Flex align="center" mr={5}>
                    <Logo />
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        FOOTER
                    </Heading>
                </Flex>
            </Container>
        </Box>
    )
}

export default Footer