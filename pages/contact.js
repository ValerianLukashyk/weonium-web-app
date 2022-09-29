import {
    useState, useEffect
} from 'react'
import {
    Button,
    Text,
    Input,
    FormLabel,
    FormErrorMessage,
    Textarea,
    FormControl,
    Modal,
    ModalOverlay,
    ModalBody,
} from '@chakra-ui/react'
import { Form, Field, Formik } from 'formik'
import CustomContent from '../components/modal/custom-content'
import { useRouter } from 'next/router'
import { bot } from '../components/api/api'



const Contact = () => {
    const [error, setError] = useState()

    const router = useRouter()
    const title = 'Contact me directly'
    const body = (
        <ModalBody>
            {error &&
                <Text color='red.500' my={5}>{error}</Text>
            }
            <Formik
                initialValues={{ name: '', email: '', message: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Your email is required';
                    } else if (!values.name) {
                        errors.email = 'Your name is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    } else if (values.message.length < 15) {
                        errors.message = "Your message is too short... Type at least 15 symbols"
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
                        <Field name="name">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel htmlFor="name">Your Name:</FormLabel>
                                    <Input {...field} type="name" id="name" placeholder="Enter your name" />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel htmlFor="email">Your Email:</FormLabel>
                                    <Input {...field} id="email" placeholder="Email" autoComplete="email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="message">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.message && form.touched.message}>
                                    <FormLabel htmlFor="message">Your Message:</FormLabel>
                                    <Textarea {...field} id="message" placeholder="Type your message here..." resize='none' />
                                    <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            my={5}
                            px={6}
                            colorScheme="lime"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Send
                        </Button>

                    </Form>
                )}
            </Formik>

        </ModalBody>
    )

    useEffect(() => {
        router.prefetch('/')
    }, [router])


    const handleSubmit = (values) => {
        const emodgi = ['🧑‍🦰', '🧑🏻‍🦱', '🧔🏽', '👴🏿', '👨‍🦳', '👩🏻‍🦰', '🧑‍🦰', '🧑🏻‍🦱']

        const options = {
            chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID_PRIVATE,
            parse_mode: 'HTML',
            text: `📨 <b>You have 1 new message</b> 📨\n\n${emodgi[Math.round(Math.random() * emodgi.length)] + " " + values.name} (${values.email})\n\n🗞 ${values.message} `,
        }
        bot.post('/sendMessage', options)
            .then(() => {
                // TODO: Implement Adding to Database Sending Timeout 1-5 min
                // server.post('/auth/sendMessage', )
                router.push(`${router.asPath}/completed`)
            })
            .catch(e => {
                setError(e)

            })
    }


    return (
        <Modal isOpen={true} onClose={() => router.back(-1)} isCentered>
            <ModalOverlay />
            <CustomContent
                title={title}
                body={body}
            />

        </Modal>
    )
}

export default Contact
