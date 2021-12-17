import {
    Container,
    Box,
    Text,
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

                    <Heading as="h1" size="lg" letterSpacing={'tighter'} mr={5}>
                        Valerian Lukashyk
                    </Heading>
                    <Text>Full stack developer</Text>
                </Flex>
            </Container>
        </Box>
    )
}

export default Footer