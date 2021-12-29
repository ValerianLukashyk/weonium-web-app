import { Container, Heading, SimpleGrid, Divider, Flex } from '@chakra-ui/react'
import Section from '../components/section'
import { PostGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import { server } from '../components/api/api'
import { useEffect } from 'react'
import useStore from '../state/useStore'
import ModalWindow from '../components/modalWindow'
import { AddIcon } from '@chakra-ui/icons'
import { glFields, values } from '../libs/formsFields'

const GlWorks = () => {
    const isAuth = useStore(state => state.authInfo.isAuth)
    const glWorks = useStore(state => state.posts)
    const getAllGlWorks = useStore(state => state.getAllPosts)

    const handleSubmit = async (values) => {
        await server.post('/posts', values)
            .then(function (res) {
                if (res.status === 200) {
                    getAllGlWorks()
                }
            })
            .catch(function (error) {
                console.log('ERROR!!!' + error);
            })
    }

    useEffect(() => {
        getAllGlWorks()
    }, [getAllGlWorks])

    return (
        <Layout title='WebGL projects'>
            <Container>
                <Flex justify='space-between' align='center'>
                    <Heading as='h3' fontSize={20} mb={4} mt={4}>
                        Latest WebGL projects
                    </Heading>
                    {isAuth && (
                        <ModalWindow callbackHook={data => handleSubmit(data)} isCentered iValues={values} fields={glFields} title='Add New WebGL project' icon={<AddIcon />} isRound={true} />
                    )
                    }
                </Flex>

                <Divider mb={3} />


                <Section delay={0.2}>
                    <SimpleGrid columns={[1, 1, 2]} gap={6}>
                        {glWorks ?
                            (
                                glWorks.map((work, index) => (
                                    <PostGridItem key={index} id={work._id} title={work.title} text={work.description} thumbnail={work.picture} />
                                ))) : (
                                <p>
                                    No WebGL Works yet
                                </p>
                            )
                        }
                    </SimpleGrid>
                </Section>
            </Container>
        </Layout>
    )
}

export default GlWorks