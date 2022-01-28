import {
    Container,
    Box,
    Text,
    Heading,
    Flex,
    useColorModeValue
} from '@chakra-ui/react'
import HireButtons from './hire-buttons'


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

                p={[0, 1, 2]}
                maxW="container.xl"
                wrap="wrap"
                align="center"
                justify="space-between"
            >
                <Flex align={["start", "center", "center"]} mr={5} justify='space-between' w="full" px={[0, 5, 16]} flexDir={['column', 'row', 'row']}>
                    <Box>
                        <Heading as="h1" size="md" letterSpacing={'tighter'} mr={5}>
                            Valerian Lukashyk
                        </Heading>
                        <Text py={[3, 0]}>Full-stack Interactive Developer</Text>
                        
                    </Box>
                    
                    <Box display="flex" mr={[0,6,6]} style={{ alignItems: 'center', gap: 10 }}>
                        <HireButtons />
                    </Box>
                    <Box display={{base: 'block'}}>
                        <Text fontWeight={900} color="whiteAlpha.200" fontSize={40}>2022</Text>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

export default Footer