import { Container, Image, Flex, Box, Heading, Divider, useColorModeValue } from '@chakra-ui/react'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import useStore from '../state/useStore'
import Paragraph from '../components/paragraph'

const Profile = () => {
    const authProfile = useStore(state => state.authInfo)
    const nameColor = useColorModeValue('gray.700', 'yellow.300')
    return (
        <Layout>
            <Container>
                <Heading as='h3' fontSize={20} mb={4}>
                    Profile Page
                </Heading>
                <Section>
                    <Divider />
                    <Box mt={3}>
                        <Flex align="center" justify='space-between'>

                            <Flex>
                                <Heading mb={3} color={nameColor} as="h3" size={'md'}>{authProfile.displayName} </Heading>
                            </Flex>
                            <Image
                                borderColor="whiteAlpha.800"
                                borderWidth={2}
                                borderStyle="solid"
                                maxWidth="100px"
                                display="inline-block"
                                borderRadius="full"
                                src={authProfile.picture ? authProfile.picture : '/nouser.png'}
                                alt="Profile Image"
                            />
                        </Flex>


                        <Paragraph>{authProfile.email} </Paragraph>
                    </Box>
                </Section>
            </Container>
        </Layout>
    )
}

export default Profile