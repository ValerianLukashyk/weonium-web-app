import { useRouter } from 'next/router';
import { server } from '../api/api'
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { LockIcon } from '@chakra-ui/icons'
import { Form, Field, Formik } from 'formik'

const Login = () => {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleSubmit = async (values) => {
        await server.post('/auth/login', values)
            .then(function (res) {
                if (res.status === 200) {
                    console.log(res.data)
                    const token = res.data
                    localStorage.setItem('token', token);
                    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7};`;
                    // setHeaders(localStorage)
                    server.defaults.headers.common['auth-token'] = token
                    router.push(`/redirect/${token}`)
                }
            })
            .catch(function (error) {
                console.log('ERROR!!!' + error);
            })
    }

    const openGoogleSignIn = (url) => {
        window.location = url
    }

    return (
        <>
            <Button mr={4} onClick={onOpen}><LockIcon mr={1} />Sign In</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                } else if (
                                    values.password.length < 6
                                ) {
                                    errors.password = 'Password must contain at least 6 letters'
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                handleSubmit(values)
                                setSubmitting(false);
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <Input {...field} id="email" placeholder="Email" />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                <FormLabel htmlFor="password">Password</FormLabel>
                                                <Input {...field} type="password" id="password" placeholder="Enter a password" />
                                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                                <FormHelperText>We&apos;ll never share your email and password.</FormHelperText>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button
                                        mt={4}
                                        colorScheme="teal"
                                        isLoading={props.isSubmitting}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Button
                            onClick={() => {
                                openGoogleSignIn(`http://localhost:5000/auth/google`)
                            }}
                            variant='solid'
                            background='blue'
                            mt={6}
                            mb={6}
                        >
                            Google
                        </Button>
                    </ModalBody>


                </ModalContent>

            </Modal>
        </>
    )
}

export default Login