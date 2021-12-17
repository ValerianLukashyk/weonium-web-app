import { useState } from 'react'
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Flex
} from '@chakra-ui/react'
import { Form, Field, Formik } from 'formik'
import Dropzone from 'react-dropzone'
import Thumb from './thumb'
import DragText from './styled/drag-text'
import useStore from '../state/useStore'


const ModalWindow = ({ title = 'Add New Post', icon, isRound = false, fields, iValues, callbackHook, ...restProps }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [hovered, setHovered] = useState(false)
    const setFormDataImages = useStore(state => state.setFormDataImages)

    const toggleHover = () => {
        if (hovered) setHovered(false)
        else setHovered(true)
    }


    return (
        <>
            <IconButton
                isRound={isRound}
                aria-label="Add Item"
                icon={icon}
                onClick={onOpen}
            ></IconButton>
            <Modal motionPreset='slideInBottom' size='xl' {...restProps} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={iValues}
                            onSubmit={(values, { setSubmitting }) => {
                                callbackHook(values)
                                setSubmitting(false)
                                onClose()
                            }}
                        >
                            {({ values, handleSubmit, handleChange, setFieldValue, isSubmitting }) => (
                                <Form onSubmit={handleSubmit} encType="multipart/form-data" >
                                    {fields && fields.map((f, i) => {
                                        return (
                                            <Field key={i} name={f.name}>
                                                {({ field }) => (
                                                    <FormControl>
                                                        <FormLabel style={{ marginTop: 8 }} htmlFor={f.name}>{f.displayName}</FormLabel>
                                                        <Input onChange={handleChange} {...field} id={f.id} placeholder={f.placeholder} />
                                                    </FormControl>
                                                )}
                                            </Field>

                                        )
                                    })}
                                    <FormLabel style={{ marginTop: 8 }} htmlFor='images'>Images</FormLabel>
                                    <Dropzone
                                        name='files'
                                        accept="image/*"
                                        onDrop={async (acceptedFiles) => {
                                            if (acceptedFiles.length === 0) { return; }

                                            setFieldValue("files", values.files.concat(acceptedFiles))

                                            let files = []
                                            files.concat(acceptedFiles)
                                            setFormDataImages(files)
                                        }}
                                    >
                                        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
                                            let message

                                            if (isDragActive) {
                                                message = 'Drop here...'
                                            }

                                            else if (isDragReject) {
                                                message = 'This format is not supported'
                                            }

                                            else if (values.files.length === 0) {
                                                message = 'Drag file here!'
                                            } else {
                                                message = ''
                                            }


                                            return (
                                                <Box transition='all 0.2s' height={'100%'} minH={50} position='relative' border={'1px dashed'} borderColor={hovered ? 'yellow' : 'inherit'} borderRadius={8} onMouseEnter={toggleHover} onMouseLeave={toggleHover} {...getRootProps()}>
                                                    <input type="file" name="files" multiple id="files" {...getInputProps()} />
                                                    <Flex justify='flex-start' wrap='wrap' >
                                                        {values.files.map((file, i) => (<Thumb key={i} file={file} />))}
                                                    </Flex>
                                                    <DragText>{message}</DragText>
                                                </Box>
                                            )
                                        }}
                                    </Dropzone>

                                    <Button
                                        mt={4}
                                        colorScheme="blue"
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        Add
                                    </Button>
                                </Form>

                            )}
                        </Formik>

                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalWindow