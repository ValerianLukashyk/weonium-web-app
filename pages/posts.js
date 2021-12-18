import { Container, Heading, SimpleGrid, Divider, Flex } from '@chakra-ui/react'
import Section from '../components/section'
import { PostGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import { server } from '../components/api/api'
import { useEffect } from 'react'
import useStore from '../state/useStore'
import ModalWindow from '../components/modalWindow'
import { AddIcon } from '@chakra-ui/icons'


const Posts = () => {
    const isAuth = useStore(state => state.authInfo.isAuth)
    const posts = useStore(state => state.posts)
    const getAllPosts = useStore(state => state.getAllPosts)

    const handleSubmit = async (values) => {
        await server.post('/posts', values)
            .then(function (res) {
                if (res.status === 200) {
                    getAllPosts()
                }
            })
            .catch(function (error) {
                console.log('ERROR!!!' + error);
            })
    }

    useEffect(() => {
        getAllPosts()
    }, [getAllPosts])

    return (
        <Layout title='Posts'>
            <Container>
                <Flex justify='space-between' align='center'>
                    <Heading as='h3' fontSize={20} mb={4} mt={4}>
                        Popular Posts
                    </Heading>
                    {isAuth && (
                        <ModalWindow callbackHook={data => handleSubmit(data)} isCentered title='Add New Post' icon={<AddIcon />} isRound={true}></ModalWindow>
                    )
                    }
                </Flex>

                <Divider mb={3} />


                <Section delay={0.2}>
                    <SimpleGrid columns={[1, 1, 2]} gap={6}>
                        {posts ? (posts.map((post, index) => (

                            <PostGridItem key={index} id={post._id} title={post.title} text={post.description} thumbnail={post.picture} />

                        )

                        )) : (
                            <p>
                                No Posts
                            </p>
                        )}

                    </SimpleGrid>
                </Section>

            </Container>
        </Layout>
    )
}

export default Posts