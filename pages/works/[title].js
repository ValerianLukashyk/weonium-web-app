import { useState, useEffect } from 'react'
import {
    Container, Badge, Link, List, ListItem, Flex, IconButton, Divider, Box, Input, Textarea, Spacer, Button, Stack, InputGroup, InputLeftAddon, FormLabel, Modal, ModalOverlay, ModalContent, Image, ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react'
import { ExternalLinkIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import useStore from '../../state/useStore'
import useQuery from '../../libs/useQuery'
import { server } from '../../components/api/api'
import { useRouter } from 'next/router';
import Loading from '../../utils/loading'
import { Formik } from 'formik';
import Dropzone from 'react-dropzone'
import Thumb from '../../components/thumb'
import { values } from '../../utils/formValues'
import DragText from '../../components/styled/drag-text'


const Work = () => {
    const [loaded, setLoaded] = useState(true)
    const [openedImg, setOpenedImg] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [hovered, setHovered] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isAuth = useStore(state => state.authInfo.isAuth)
    const work = useStore(state => state.currentWork)
    const workFetch = useStore(state => state.workFetch)
    const isActive = useStore(state => state.isDragActive)
    const toggleDragActive = useStore(state => state.toggleDragActive)
    const setFormDataImages = useStore(state => state.setFormDataImages)
    const query = useQuery()
    const router = useRouter()

    useEffect(() => {
        if (!query) {
            return;
        }
        workFetch(query.title)
    }, [query, workFetch]);

    const handleEdit = () => {
        if (editMode) setEditMode(false)
        else setEditMode(true)
    }
    const handleOpen = (e) => {
        setOpenedImg(e.target.attributes.src.value)
        onOpen()
    }

    const handleDelete = () => {
        setLoaded(false)
        server.delete(`/works/${query.title}`)
            .then((res) => {
                if (res.status === 200) {

                    router.back()
                }
            })
            .catch(err => console.log(err))
    }

    const toggleHover = () => {
        if (hovered) setHovered(false)
        else setHovered(true)
    }



    return (
        <Layout title={work.title}>
            <Container>
                <Flex justify='space-between'>
                    <Title lineHeight={2}>
                        {work.title}
                        <Badge ml={2}>{work.period}</Badge>
                    </Title>
                    {isAuth && !editMode && <Box>
                        <IconButton
                            mr={1}
                            isRound={true}
                            aria-label="Edit Item"
                            icon={<EditIcon />}
                            onClick={handleEdit}
                        ></IconButton>
                        <IconButton

                            isRound={true}
                            aria-label="Remove Item"
                            icon={<DeleteIcon />}
                            onClick={handleDelete}
                        ></IconButton>
                    </Box>}

                </Flex>
                <Divider my={4} />
                {editMode ? (
                    <Box>
                        <Formik
                            initialValues={values}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    actions.setSubmitting(false);
                                }, 1000);
                            }}

                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    <Stack spacing={2}>
                                        <Input
                                            type="text"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.title}
                                            name="title"
                                        />
                                        <Input
                                            type="text"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.period}
                                            name="period"
                                        />
                                        <Textarea
                                            type="text"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.description}
                                            name="description"
                                        />
                                        <InputGroup>
                                            <InputLeftAddon>
                                                <Meta>Website</Meta>
                                            </InputLeftAddon>
                                            <Input
                                                type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.url}
                                                name="url"
                                            />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputLeftAddon >
                                                <Meta>Stack</Meta>
                                            </InputLeftAddon >
                                            <Input
                                                type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.stack}
                                                name="stack"
                                            />
                                        </InputGroup>

                                        <FormLabel style={{ marginTop: 8 }} htmlFor='images'>Images</FormLabel>
                                        <Dropzone
                                            name='files'
                                            accept="image/*"
                                            onDrop={async (acceptedFiles) => {
                                                if (acceptedFiles.length === 0) { return; }

                                                props.setFieldValue("files", props.values.files.concat(acceptedFiles))

                                                let files = []
                                                files.concat(acceptedFiles)
                                                setFormDataImages(files)
                                            }}
                                        >
                                            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
                                                let message
                                                if (isDragActive) {
                                                    message = 'Drop here...'
                                                    toggleDragActive(true)
                                                }

                                                else if (isDragReject) {
                                                    message = 'This format is not supported'
                                                    toggleDragActive(true)
                                                }

                                                else if (props.values.files.length === 0) {
                                                    message = 'Drag file here!'
                                                    toggleDragActive(true)
                                                }
                                                else {
                                                    if (isActive) toggleDragActive(false)
                                                    else if (!isActive) toggleDragActive(false)
                                                }

                                                return (
                                                    <Box transition='all 0.2s' height={'100%'} minH={50} position='relative' border={'1px dashed'} borderColor={hovered ? 'yellow' : 'inherit'} borderRadius={8} onMouseEnter={toggleHover} onMouseLeave={toggleHover} {...getRootProps()}>
                                                        <input type="file" name="files" multiple id="files" {...getInputProps()} />
                                                        <Flex justify='flex-start' wrap='wrap' >
                                                            {work.screenshots && work.screenshots.map(img, i => (
                                                                <Box display='flex' alignItems='center' justifyContent="center" width={'120px'} height={'120px'}>
                                                                    <Image
                                                                        key={i}
                                                                        src={img}
                                                                        alt='thumbnails'
                                                                        className="img-thumbnail mt-2 thumb-screen"
                                                                        height={'100px'}
                                                                        width={'100px'}
                                                                    />
                                                                </Box>
                                                            ))}
                                                            {props.values.files && props.values.files.map((file, i) => (<Thumb key={i} file={file} />))}
                                                        </Flex>
                                                        {isActive && <DragText>{message}</DragText>}
                                                    </Box>
                                                )
                                            }}
                                        </Dropzone>
                                    </Stack>
                                    {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
                                    <Flex mt={4}>
                                        <Button bg='blue.400' w={'48%'} type="submit">Update</Button>
                                        <Spacer />
                                        <Button onClick={() => setEditMode(false)} bg='red.400' w={'48%'} >Cancel</Button>
                                    </Flex>

                                </form>
                            )}
                        </Formik>


                    </Box>
                ) : (
                    <Box>
                        {loaded ? (
                            <Box>
                                <P>
                                    {work.description}
                                </P>
                                <List ml={4} my={4}>
                                    <ListItem>
                                        <Meta>Website</Meta>

                                        <Link href={work.url}>
                                            {work.url}
                                            <ExternalLinkIcon mx='2px' />
                                        </Link>


                                    </ListItem>
                                    <ListItem>
                                        <Meta>Stack</Meta>
                                        <span>
                                            {work.stack}
                                        </span>
                                    </ListItem>
                                </List>
                                {
                                    work.screenshots && [...work.screenshots].reverse().map(
                                        (img, i) => {
                                            return (
                                                <Box key={i}>
                                                    < WorkImage key={i} src={process.env.NEXT_PUBLIC_SERVER_URL + ':' + process.env.NEXT_PUBLIC_SERVER_PORT + img} alt='SweetGlass' clk={handleOpen} />
                                                </Box>
                                            )
                                        }
                                    )

                                }
                                {work.screenshots && (
                                    <Modal onClose={onClose} size='full' isOpen={isOpen} >
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalCloseButton position='fixed' w={50} h={50} right={50} top={4} />
                                            <ModalBody>
                                                <Image onDoubleClick={onClose} w='full' alt={'screenshot main'} src={openedImg} />
                                            </ModalBody>
                                        </ModalContent>
                                    </Modal>
                                )}
                                <Box>

                                    {/* TODO: Complete Video Uploading */}

                                    {/* <form method='post' action='http://localhost:5000/uploadVideo'>
                                        <label htmlFor="videos" className="videoUploader">
                                            <IconContext.Provider value={{ size: "4em" }}>
                                                <Box
                                                    transition='all 0.2s'
                                                    height={'100%'}
                                                    minH={50}
                                                    position='relative'
                                                    border={'1px dashed'}
                                                    _hover={{
                                                        borderColor: "yellow",
                                                        cursor: "pointer"
                                                    }}
                                                    borderColor={'inherit'}
                                                    borderRadius={8}
                                                    textAlign={'center'}
                                                    p={9}
                                                    mb={9}
                                                >
                                                    <Center>
                                                        <IoAddCircleOutline />
                                                        <Text ml={2}>Add video</Text>
                                                    </Center>

                                                </Box>
                                            </IconContext.Provider >
                                        </label>
                                        <input onChange={null} style={{ display: 'none' }} type="file" name="videos" multiple id="videos" />
                                    </form> */}

                                    {/* <video controls autoPlay loop width={1200} height={700}>
                                        <source type="video/mp4" src="/video.mp4" />
                                        Your browser does not support the video tag.
                                    </video> */}
                                </Box>
                            </Box>
                        ) :
                            (
                                <Loading />
                            )
                        }
                    </Box>
                )}
            </Container>
        </Layout>
    )
}


export default Work