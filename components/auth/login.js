import { Button } from '@chakra-ui/react'
import { IoLockClosed } from 'react-icons/io5'
import NextLink from 'next/link'

const Login = () => {
    return (
        <>
            <NextLink href={'/login'}>
                <Button colorScheme="blue" mr={4}>
                    <>
                        <IoLockClosed />
                        &nbsp;Login
                    </>
                </Button>
            </NextLink>
        </>
    )
}

export default Login
