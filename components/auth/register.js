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
// import { useRouter } from 'next/router';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { IconContext } from 'react-icons'
import NextLink from 'next/link'

const RegisterForm = () => {
    const [confirm, setConfirm] = useState(false)
    // const router = useRouter()

    const handleRegister = async (values) => {
        await server.post('/auth/register', values)
            .then(function (res) {
                if (res.status === 200) {
                    console.log(res)
                    setConfirm(true)

                }
            })
            .catch(function (error) {
                console.log('ERROR!!!' + error);
            })
    }

    const sendConfirmEmail = async () => {
        const values = {
            from: "admin@weonium.com",
            to: "weonium@gmail.com",
            subject: "Hello World!",
            text: "Welcome to mail server, God!",
            html: "<h1>Ye hoo hooo ho</h1>",
        }

        const formData = new FormData();
        formData.append('from', values.from);
        formData.append('to', values.to);
        formData.append('subject', values.subject);
        formData.append('text', values.text);
        formData.append('html', values.html);


        await server.post('/mail', formData, (req, res) => {
            console.log(res)
        })
    }


    return (
        <Box>
            {confirm ? <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
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
                                    <Input {...field} id="name" placeholder="Enter your name" />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" placeholder="Enter Email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password || form.errors.confirmPassword}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input {...field} type="password" id="password" placeholder="Enter a password" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    {/* <FormHelperText>We'll never share your email and password.</FormHelperText> */}
                                </FormControl>
                            )}
                        </Field>
                        <Field name="confirmPassword">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                    <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                                    <Input {...field} type="password" id="confirmPassword" placeholder="Confirm a password" />
                                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

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
            </Formik> : (

                <IconContext.Provider value={{ color: "lightblue", size: "6em" }}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent='center' py={6}>

                        <IoIosCheckmarkCircleOutline />
                        <Heading textAlign={['left', 'center']} as='h3' size='sm' color="lightblue" mb={4}>
                            Please check your email inbox and confirm that you are owner.
                        </Heading>
                        <NextLink href="/">
                            <Button color='black' bg={'lightblue'}>Go to home</Button>

                        </NextLink>
                        <Button onClick={sendConfirmEmail} color='white' bg={'red'}>SEND TEST EMAIL</Button>
                    </Box>
                </IconContext.Provider>

            )}
        </Box>
    )
}

export default RegisterForm