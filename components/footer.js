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
                maxW="container.xl"
                wrap="wrap"
                align="center"
                justify="space-between"
            >
                <Flex align="center" mr={5}>
                    <Box>
                        <Heading as="h1" size="md" letterSpacing={'tighter'} mr={5}>
                            Valerian Lukashyk
                        </Heading>
                        <Text>Full-stack Interactive Developer</Text>
                    </Box>
                    <Box>
                        <Text ml={10}>All rights reserved. 2022</Text>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

export default Footer