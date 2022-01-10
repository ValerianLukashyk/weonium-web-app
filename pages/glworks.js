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

const GlWorks = () => {
    const [loaded, setLoaded] = useState(true)
    const isAuth = useStore(state => state.authInfo.isAuth)
    const glWorks = useStore(state => state.posts)
    const getAllGlWorks = useStore(state => state.getAllPosts)

    const handleSubmit = async (fValues) => {
        const formData = new FormData();
        console.log(fValues)
        formData.append('title', fValues.title);
        formData.append('description', fValues.description);
        formData.append('url', fValues.url);
        for (let i = 0; i < fValues.files.length; i++) {
            formData.append('images', fValues.files[i]);
        }
        setLoaded(false)
        server.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log('done')
                    getAllGlWorks()
                    setLoaded(true)
                }
            })
            .catch((error) => {
                console.log(error);
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

                <Divider mb={6} />


                <Section delay={0.2}>
                    <SimpleGrid columns={[1, 1, 2]} gap={6}>
                        {glWorks ?
                            (
                                glWorks.map((work, index) => (
                                    <PostGridItem key={index} slug={work.slug} title={work.title} text={work.description} thumbnail={work.screenshots[0]} />
                                ))
                            ) : (
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