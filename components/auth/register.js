import { useState } from 'react'
import { Form, Field, Formik } from 'formik'
import {
    Button,
    Box,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading
} from '@chakra-ui/react'
import { server } from '../api/api'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { IconContext } from 'react-icons'
import NextLink from 'next/link'
import Loading from '../../utils/loading'

const RegisterForm = () => {
    const [confirm, setConfirm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState()
    const handleRegister = async (values) => {
        setIsLoading(true)
        await server.post('/auth/register', values)
            .then(function (res) {
                console.log(res)
                if (res.status === 200) {
                    setConfirm(true)
                    setIsLoading(false)
                } else {
                    setErrors(res)
                }
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    return (
        <Box>
            {
                isLoading ?
                    <Loading /> :
                    confirm ?
                        <Box>Please check your email inbox for confirm</Box> :
                        <Formik
                            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (!values.name) {
                                    errors.name = 'It would be better to know your name'
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                } else if (
                                    values.password.length < 6
                                ) {
                                    errors.password = 'Password must contain at least 6 letters'
                                } else if (
                                    values.confirmPassword !== values.password
                                ) {
                                    errors.confirmPassword = 'Your passwords is different'
                                    errors.password = ''
                                } else {
                                    errors = null
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                handleRegister(values)
                                setSubmitting(false);
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name="name">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="name">Your name</FormLabel>
                                                <Input {...field} id="name" placeholder="Enter your name" autoComplete="username" />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <Input {...field} id="email" placeholder="Enter Email" autoComplete="email" />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.password && form.touched.password || form.errors.confirmPassword}>
                                                <FormLabel htmlFor="password">Password</FormLabel>
                                                <Input {...field} type="password" id="password" placeholder="Enter a password" autoComplete="new-password" />
                                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                                {/* <FormHelperText>We'll never share your email and password.</FormHelperText> */}
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="confirmPassword">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                                <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                                                <Input {...field} type="password" id="confirmPassword" placeholder="Confirm a password" autoComplete="new-password" />
                                                <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <p>{errors}</p>
                                    <Button
                                        mt={4}
                                        colorScheme="teal"
                                        isLoading={props.isSubmitting}
                                        type="submit"
                                    // isDisabled={props.errors ? true : false}

                                    >
                                        Register
                                    </Button>
                                </Form>
                            )}
                        </Formik>

            }
        </Box >
    )
}

export default RegisterForm