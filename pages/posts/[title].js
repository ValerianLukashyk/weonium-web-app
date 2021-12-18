import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useStore from '../../state/useStore'
import { server } from '../../components/api/api'
import { Title, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { Container, Badge, List, Image, ListItem } from '@chakra-ui/react'


const Post = () => {
    const router = useRouter()
    const { id } = router.query
    const post = useStore(state => state.post)
    const setPost = useStore(state => state.setPost)

    //TODO: Migrate api request to useStore api
    useEffect(() => {
        server.defaults.headers.common['auth-token'] = localStorage.getItem('token');
        server.get(`/posts/${id}`)
            .then((res) => {
                setPost(res.data);
            })
    }, [id, setPost])

    return (
        <Layout title={post.title}>
            <Container>
                <Title>{post.title} <Badge>{post.period}</Badge>
                </Title>
                <P >
                    {post.description}
                </P>
                <Image mt={6} src={post.picture} alt={post.title} />
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Author</Meta>
                        <span>
                            Valerian Lukashyk
                        </span>
                    </ListItem>
                </List>

            </Container>
        </Layout>
    )
}

export default Post