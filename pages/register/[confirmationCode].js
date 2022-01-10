import { useRouter } from 'next/router'
import { server } from '../../components/api/api'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { Box, Container, Heading, Link, Divider, Text } from '@chakra-ui/react'
import Loading from '../../utils/loading'

const EmailConfirm = () => {

    const [message, setMessage] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const router = useRouter()
    const { confirmationCode } = router.query

    useEffect(() => {
        if (confirmationCode) {
            server.get(`/auth/confirm/${confirmationCode}`)
                .then(function (res) {
                    console.log(res)
                    setMessage(res.data.message)
                    setIsConfirmed(true)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }, [confirmationCode, setIsConfirmed])

    return (
        <>
            {isConfirmed ?
                <Container mb={6}>
                    <Box>
                        <Heading as={'h3'}>
                            Account confirmed!
                        </Heading>
                    </Box>
                    <Divider my={6} />
                    <Box>
                        <Text fontSize={20} my={3}>{message}</Text>
                        <NextLink href={'/login'}>
                            <Link my={3}>
                                Please Login
                            </Link>
                        </NextLink>
                    </Box>

                </Container> :
                <Loading />
            }
        </>
    )
}

export default EmailConfirm