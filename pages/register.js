import {
    Container,
    Box,
    Heading,
    Divider
} from '@chakra-ui/react'
import RegisterForm from '../components/auth/register'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import useStore from '../state/useStore'

const Register = () => {

    return (
        <Layout>
            <Container>
                <Heading as='h3' fontSize={20} mb={4}>
                    Register new Account
                </Heading>
                <Section>
                    <Divider />
                    <Box mt={3}>
                        <RegisterForm />
                    </Box>
                </Section>
            </Container>
        </Layout>
    )
}

export default Register