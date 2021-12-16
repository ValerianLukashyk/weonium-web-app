import { useRouter } from 'next/router'
import Layout from '../../components/layouts/article'
import { Flex, Container, Box, Heading, Divider } from '@chakra-ui/react'
import Section from '../../components/section'

const Profile = () => {
    const router = useRouter()
    const { displayName, email } = router.query

    return (
        <Layout>
            <Container>
                <Heading as='h3' variant='page-title' fontSize={20} mb={4}>
                    Your Profile
                </Heading>
                <Section>
                    <Divider />
                    <Box mt={3}>
                        <Flex>
                            <Heading mb={3} mr={3} as="h3" size={'md'}>Name:</Heading>
                            <Heading mb={3} color={'yellow.300'} as="h3" size={'md'}>{displayName} </Heading>
                        </Flex>

                        <Heading mb={3} as="h3" size={'md'}>Email: {email} </Heading>
                    </Box>
                </Section>
            </Container>
        </Layout>
    )
}

export default Profile