import { useState } from 'react'
import {
    IconButton, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormControl,
    FormLabel,Icon,
    FormErrorMessage,
    Text, Textarea,
    Button, Input, useColorModeValue
} from '@chakra-ui/react'
import { AiOutlineMessage } from 'react-icons/ai'
import { BiMessageRoundedCheck } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { Form, Field, Formik } from 'formik'
import {  bot } from './api/api'

const MotionIconButton = motion(IconButton)

const Contact = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [error, setError] = useState()
    const [sended, setSended] = useState(false)

    const color = useColorModeValue("white", "white")
    const variant = useColorModeValue("solid", "ghost")


    const handleSubmit = (values) => {
        const emodgi = ['🧑‍🦰', '🧑🏻‍🦱', '🧔🏽', '👴🏿', '👨‍🦳', '👩🏻‍🦰', '🧑‍🦰', '🧑🏻‍🦱']
        
        const options = {
            chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID_PRIVATE,
            parse_mode: 'HTML',
            text: `📨 <b>You have 1 new message</b> 📨\n\n${emodgi[Math.round(Math.random() * emodgi.length)] + " " + values.name} (${values.email})\n\n🗞 ${values.message} `,
        }
        bot.post('/sendMessage', options)
            .then(res => {
                console.log(res)
                // server.post('/auth/sendMessage', )
                setSended(true)
            })
            .catch(e => {
                setError(e)
                console.log(e)})
    }
    
    return (
        <Box>
            <MotionIconButton
                onClick={onOpen}
                position='fixed'
                bottom={"42px"}
                right={10}
                zIndex={10}
                isRound
                colorScheme='lime'
                aria-label='Send message'
                size='lg'
                variant={variant}
                icon={
                    <AiOutlineMessage color={color} size={40} />
                }
                animate={{
                    scale: [1, 1, 1.5, 1.5, 1.5, 1.5, 1],
                    rotate: [0, 0, 45, -45, 45, -45, 0],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8],
                    repeat: Infinity,
                    repeatDelay: 3
                }}
            />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color="">{sended ? "Your message sended!" : "Contact me directly"}</ModalHeader>
                    <ModalCloseButton />
                    {!sended ? <ModalBody>
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
                        
                    </ModalBody> : (
                        <ModalBody display={'flex'} justifyContent={'center'} flexDir={"column"} alignItems={'center'}>
                            <Icon as={BiMessageRoundedCheck} w={56} h={56}/>
                            <Text py={5} fontSize={20}>I&rsquo;ll message you soon...</Text>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default Contact