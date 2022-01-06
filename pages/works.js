import { useEffect, useState } from 'react'
import { server } from '../components/api/api'
import { Container, Flex, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import useStore from '../state/useStore'
import { AddIcon } from '@chakra-ui/icons'
import ModalWindow from '../components/modalWindow'
import Loading from './../utils/loading'
import { workFields, values } from '../libs/formsFields'

const Works = () => {
    const [loaded, setLoaded] = useState(true)
    const isAuth = useStore(state => state.authInfo.isAuth)
    const works = useStore(state => state.works)
    const getAllWorks = useStore(state => state.getAllWorks)



    const handleSubmit = async (values) => {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('period', values.period);
        formData.append('description', values.description);
        formData.append('url', values.url);
        formData.append('stack', values.stack);
        for (let i = 0; i < values.files.length; i++) {
            formData.append('images', values.files[i]);
        }
        for (let i = 0; i < values.videos.length; i++) {
            formData.append('videos', values.videos[i]);
        }
        setLoaded(false)
        server.post('/works', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    getAllWorks()
                    setLoaded(true)
                }
            })
            .catch((error) => {
                console.log('ERROR!!!' + error);
            })
    }

    useEffect(() => {
        getAllWorks()
    }, [getAllWorks])



    return (
        <Layout>
            {loaded ? (<Container>
                <Flex justify='space-between' align='center'>
                    <Heading as='h3' fontSize={20} mb={4} mt={4}>
                        Works
                    </Heading>

                    {isAuth && <ModalWindow title='Add new Work' callbackHook={(data) => handleSubmit(data)} fields={workFields} iValues={values} isCentered icon={<AddIcon />} isRound={true} />}
                    {/* {isAuth && <WorkModal title='Add new Work' callbackHook={(data) => handleSubmit(data)} isCentered icon={<AddIcon />} isRound={true} />} */}
                </Flex>
                <Divider mb={6} />
                <Section delay={0.2}>
                    <SimpleGrid columns={[1, 1, 2]} gap={6}>
                        {works && (
                            [...works].reverse().map((work, index) => (
                                <Section key={index}>
                                    <WorkGridItem key={index} title={work.title} slug={work.slug} thumbnail={work.screenshots[0]} />
                                </Section>
                            ))
                        )}

                    </SimpleGrid>
                </Section>
            </Container>) : (
                <Loading />
            )}
        </Layout>
    )
}

export default Works