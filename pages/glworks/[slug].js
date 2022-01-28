import { useEffect, useState } from 'react'
import useStore from '../../state/useStore'
import { TitleGL, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { Image, Divider, Container, IconButton, List, Link, Box, Flex, ListItem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { ExternalLinkIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
// import useQuery from '../../libs/useQuery'
import { server } from '../../components/api/api'
import { useRouter } from 'next/router';
import Loading from '../../utils/loading'

const GlWork = () => {
    const isAuth = useStore(state => state.authInfo.isAuth)
    const superUser = useStore(state => state.authInfo.superuser)
    const post = useStore(state => state.post)
    const postFetch = useStore(state => state.postFetch)
    const [isLoading, setIsLoading] = useState(true)
    const [openedImg, setOpenedImg] = useState()
    const [editMode, setEditMode] = useState(false)
    const router = useRouter()
    
    const { slug } = router.query
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (!slug) {
            return
        }
        postFetch(slug)
        setIsLoading(false)
    }, [slug, postFetch]);

    const handleOpen = (e) => {
        setOpenedImg(e.target.attributes.src.value)
        onOpen()
    }

    const handleEdit = () => {
        if (editMode) setEditMode(false)
        else setEditMode(true)
    }

    const handleDelete = () => {
        setIsLoading(true)
        server.delete(`/posts/${query.slug}`)
            .then((res) => {
                if (res.status === 200) {
                    router.back()
                    setIsLoading(false)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Layout title={post && post.title}>
            {isLoading ? <Loading /> :
                <Container>
                    <Flex justify='space-between'>
                        <TitleGL lineHeight={2}>
                            {post && post.title}
                        </TitleGL>
                        {
                            isAuth && superUser && !editMode &&
                            <Box>
                                <IconButton
                                    mr={1}
                                    isRound={true}
                                    aria-label="Edit Item"
                                    icon={<EditIcon />}
                                    onClick={handleEdit}
                                />
                                <IconButton

                                    isRound={true}
                                    aria-label="Remove Item"
                                    icon={<DeleteIcon />}
                                    onClick={handleDelete}
                                />
                            </Box>
                        }
                    </Flex>
                    <Divider my={4} />
                    <P >
                        {post && post.description}
                    </P>

                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Url</Meta>

                            <Link href={post && post.url}>
                                {post && post.url}
                                <ExternalLinkIcon mx='2px' />
                            </Link>


                        </ListItem>
                    </List>
                    {
                        post && post.screenshots && [...post.screenshots].reverse().map(
                            (img, i) => {
                                return (
                                    <Box key={i}>
                                        < WorkImage key={i} src={process.env.NEXT_PUBLIC_SERVER_URL + ':' + process.env.NEXT_PUBLIC_SERVER_PORT + img} alt='SweetGlass' clk={handleOpen} />
                                    </Box>
                                )
                            }
                        )
                    }
                    {post && post.screenshots && (
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
                </Container>
            }
        </Layout>
    )
}



export default GlWork