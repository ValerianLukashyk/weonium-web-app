import { useEffect, useState } from 'react'
import useStore from '../../state/useStore'
import { TitleGL, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { Divider, Container, IconButton, List, Link, Box, Flex, ListItem, useDisclosure } from '@chakra-ui/react'
import { ExternalLinkIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import useQuery from '../../libs/useQuery'
import { server } from '../../components/api/api'
import { useRouter } from 'next/router';


const glWork = () => {
    const [loaded, setLoaded] = useState(false)
    const post = useStore(state => state.post)
    const router = useRouter()
    const query = useQuery()
    const isAuth = useStore(state => state.authInfo.isAuth)
    const [editMode, setEditMode] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const postFetch = useStore(state => state.postFetch)

    useEffect(() => {
        if (!query) {
            return;
        }
        postFetch(query.slug)
        setLoaded(true)
    }, [query, postFetch]);

    

    const handleEdit = () => {
        if (editMode) setEditMode(false)
        else setEditMode(true)
    }

    const handleDelete = () => {
        setLoaded(false)
        server.delete(`/posts/${query.slug}`)
            .then((res) => {
                if (res.status === 200) {
                    router.back()
                    setLoaded(true)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Layout title={post && post.title}>
            <Container>
            <Flex justify='space-between'>
                <TitleGL lineHeight={2}>
                    {post && post.title}
                </TitleGL>
                {
                    isAuth && !editMode &&
                    <Box>
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
                                    < WorkImage key={i} src={process.env.NEXT_PUBLIC_SERVER_URL + ':' + process.env.NEXT_PUBLIC_SERVER_PORT + img} alt='SweetGlass' clk={onOpen} />
                                </Box>
                            )
                        }
                    )
                }



            </Container>
        </Layout>
    )
}

export default glWork