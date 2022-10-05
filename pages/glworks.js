import { Container, Heading, SimpleGrid, Divider, Flex } from '@chakra-ui/react'
import Section from '../components/section'
import { PostGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import { server } from '../components/api/api'
import { useEffect, useState } from 'react'
import useStore from '../state/useStore'
import ModalWindow from '../components/modalWindow'
import { AddIcon } from '@chakra-ui/icons'
import { glFields, values } from '../libs/formsFields'
import Loading from '../utils/loading'

const GlWorks = () => {
    const [isLoading, setIsLoading] = useState(true)
    const isAuth = useStore(state => state.authInfo.isAuth)
    const superUser = useStore(state => state.authInfo.superuser)
    const glWorks = useStore(state => state.posts)
    const getAllGlWorks = useStore(state => state.getAllPosts)

    const handleSubmit = async values => {
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('description', values.description)
        formData.append('url', values.url)
        for (let i = 0; i < values.files.length; i++) {
            formData.append('images', values.files[i])
        }
        setIsLoading(true)
        server
            .post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    getAllGlWorks()
                    setIsLoading(false)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllGlWorks()
        setIsLoading(false)
    }, [getAllGlWorks, setIsLoading])

    return (
        <Layout title="WebGL projects">
            {isLoading ? (
                <Loading />
            ) : (
                <Container>
                    <Flex justify="space-between" align="center">
                        <Heading as="h3" fontSize={20} mb={4} mt={4}>
                            Latest WebGL projects
                        </Heading>
                        {isAuth && superUser && (
                            <ModalWindow
                                callbackHook={data => handleSubmit(data)}
                                isCentered
                                iValues={values}
                                fields={glFields}
                                title="Add New WebGL project"
                                icon={<AddIcon />}
                                isRound={true}
                            />
                        )}
                    </Flex>

                    <Divider mb={6} />

                    <Section delay={0.2}>
                        <SimpleGrid columns={[1, 1, 2]} gap={6}>
                            {glWorks ? (
                                [...glWorks]
                                    .reverse()
                                    .map((work, index) => (
                                        <PostGridItem
                                            w={['100%', '75%', '47%']}
                                            key={index}
                                            slug={work.slug}
                                            title={work.title}
                                            text={work.description}
                                            thumbnail={work.screenshots[0]}
                                        />
                                    ))
                            ) : (
                                <p>No WebGL Works yet</p>
                            )}
                        </SimpleGrid>
                    </Section>
                </Container>
            )}
        </Layout>
    )
}

export default GlWorks
