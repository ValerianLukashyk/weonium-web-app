import { Container, Checkbox, Tooltip, Image, Flex, Box, Heading, Divider, useColorModeValue } from '@chakra-ui/react'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import useStore from '../state/useStore'
import { server } from '../components/api/api'

const Profile = () => {
    const authProfile = useStore(state => state.authInfo)
    const fetchAuthInfo = useStore(state => state.fetchAuthInfo)
    const nameColor = useColorModeValue('gray.700', 'yellow.300')

    const photoUpload = (e) => {
        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('images', e.target.files[i]);
        }
        server.post(`/auth/photo-upload/${authProfile._id}`, formData)
            .then(() => {
                fetchAuthInfo()
            })
    }

    return (
        <Layout>
            <Container>
                <Heading as='h3' fontSize={20} mb={4}>
                    Profile Page
                </Heading>
                <Section>
                    <Divider />
                    <Box mt={3}>
                        <Flex align="center" justify='space-between'>

                            <Flex>
                                <Heading mb={3} color={nameColor} as="h3" size={'md'}>{authProfile.displayName} </Heading>
                            </Flex>
                            <label htmlFor='photo'>
                                <Tooltip label='Change photo' bg={'whiteAlpha.200'} color='whiteAlpha.900'>
                                    <Image
                                        cursor="pointer"
                                        borderColor="whiteAlpha.500"
                                        borderWidth={2}
                                        borderStyle="solid"
                                        maxWidth="100px"
                                        display="inline-block"
                                        borderRadius="full"
                                        src={authProfile.picture ? authProfile.picture : '/nouser.png'}
                                        alt="Profile Image"
                                        transition={'all 0.2s'}
                                        _hover={{
                                            transform: "scale(1.05)",
                                            borderColor: "black.500",
                                        }}
                                    />
                                </Tooltip>
                                <input onChange={photoUpload} name="photo" id='photo' type="file" accept=".jpg, .jpeg, .png" style={{ display: 'none' }} />
                            </label>
                        </Flex>
                        <Checkbox mt={5}>Receive notification about new works</Checkbox>
                    </Box>
                </Section>
            </Container>
        </Layout >
    )
}

export default Profile