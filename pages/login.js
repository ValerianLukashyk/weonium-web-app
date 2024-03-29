import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { server } from '../components/api/api'
import {
    Button,
    Flex,
    Center,
    Text,
    Link,
    Input,
    Divider,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Modal,
    Tooltip,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useColorModeValue
} from '@chakra-ui/react'
import { Form, Field, Formik } from 'formik'
import { IoLogoGoogle, IoLogoGithub } from 'react-icons/io5'
import NextLink from 'next/link'

const Login = () => {
    const [error] = useState()
    const router = useRouter()
    const clr = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900')

    useEffect(() => {
        router.prefetch('/')
    }, [router])

    const handleSubmit = async values => {
        await server
            .post('/auth/login', values)
            .then(function (res) {
                if (res.status === 200) {
                    const token = res.data
                    localStorage.setItem('token', token)
                    document.cookie = `token=${token}; path=/; max-age=${
                        60 * 60 * 24 * 7
                    };`
                    server.defaults.headers.common['auth-token'] = token
                    router.push(`/redirect/${token}`)
                }
            })
            .catch(function (error) {
                setError(error.response.data.message)
            })
    }

    return (
        <Modal isOpen={true} onClose={() => router.push('/')} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {error && (
                        <Text color="red.500" my={5}>
                            {error}
                        </Text>
                    )}
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {}
                            if (!values.email) {
                                errors.email = 'Required'
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                )
                            ) {
                                errors.email = 'Invalid email address'
                            } else if (values.password.length < 6) {
                                errors.password =
                                    'Password must contain at least 6 letters'
                            }
                            return errors
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values)
                            setSubmitting(false)
                        }}
                    >
                        {props => (
                            <Form>
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.email &&
                                                form.touched.email
                                            }
                                        >
                                            <FormLabel htmlFor="email">
                                                Email
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                id="email"
                                                placeholder="Email"
                                                autoComplete="email"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.password &&
                                                form.touched.password
                                            }
                                        >
                                            <FormLabel htmlFor="password">
                                                Password
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                type="password"
                                                id="password"
                                                placeholder="Enter a password"
                                                autoComplete="current-password"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>
                                            <FormHelperText>
                                                We&apos;ll never share your
                                                email and password.
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                </Field>
                                <Center alignItems={'center'} mt={5}>
                                    <Button
                                        px={6}
                                        colorScheme="lime"
                                        isLoading={props.isSubmitting}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                    <Text fontSize={13} ml={3}>
                                        if you dont have account, please
                                        <NextLink href={'/register'}>
                                            <Link
                                                ml={2}
                                                p={2}
                                                bg={'red.700'}
                                                color={clr}
                                                borderRadius={5}
                                            >
                                                Register
                                            </Link>
                                        </NextLink>
                                    </Text>
                                </Center>
                            </Form>
                        )}
                    </Formik>
                    <Flex justifyContent={'center'} alignItems={'center'}>
                        <Divider width="40%" my={6} mr={2} />
                        <Text>or use</Text>
                        <Divider width="40%" my={6} ml={2} />
                    </Flex>

                    <Center flexDirection={'column'}>
                        <Button
                            onClick={() => {
                                window.location =
                                    process.env.NEXT_PUBLIC_SERVER_URL +
                                    ':' +
                                    process.env.NEXT_PUBLIC_SERVER_PORT +
                                    '/auth/google'
                            }}
                            variant="solid"
                            mb={6}
                            colorScheme={'blue'}
                            leftIcon={<IoLogoGoogle />}
                        >
                            Google
                        </Button>
                        <Tooltip label="Comming soon">
                            <div>
                                <Button
                                    onClick={() => {
                                        window.location =
                                            process.env.NEXT_PUBLIC_SERVER_URL +
                                            ':' +
                                            process.env
                                                .NEXT_PUBLIC_SERVER_PORT +
                                            '/auth/github'
                                    }}
                                    variant="solid"
                                    mb={6}
                                    isDisabled
                                    colorScheme={'orange'}
                                    leftIcon={<IoLogoGithub />}
                                >
                                    GitHub
                                </Button>
                            </div>
                        </Tooltip>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Login
