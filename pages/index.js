import { useState, useEffect } from 'react'
import { server } from "../components/api/api"
import NextLink from 'next/link'
import {
  Container,
  Box,
  Heading,
  Image,
  Button,
  Link,
  SimpleGrid,
  Icon,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import { GridItem } from '../components/grid-item'
import { IoLogoLinkedin, IoLogoGithub, IoLogoStackoverflow } from 'react-icons/io5'


const Page = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    server.get('/settings')
      .then(function (res) {
        setData(res.data[0])
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])
  return (
    <Layout>
      <Container maxW='2xl'>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          p={3}
          mb={6}
          align="center"
        >
          {data.helloMessage}
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              {data.name}
            </Heading>
            <p>{data.position}</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            align="center"
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/avatar-1.jpg"
              alt="Profile Image"
            />
          </Box>
        </Box>
        <Section delay={0.1}>
          <Heading as="h3" variant='section-title'>
            {data.workTitle}
          </Heading>
          <Paragraph>
            {data.workDescription}
          </Paragraph>
          <Box align='center' my={4}>
            <NextLink href="/works">
              <Button
                rightIcon={<ChevronRightIcon />} colorScheme='teal'
              >My Portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>
        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            {data.bioTitle}
          </Heading>
          <BioSection>
            <BioYear>1990</BioYear>
            Born in Lviv, Ukraine.
          </BioSection>
          <BioSection>
            <BioYear>2012</BioYear>
            Completed Kyiv International Univercity, Information Science cafedra.
          </BioSection>
          <BioSection>
            <BioYear>2014</BioYear>
            Works as a freelance
          </BioSection>
          <BioSection>
            <BioYear>2019 to present</BioYear>
            Works in Digital Studio Weonium
          </BioSection>
        </Section>
        <Section delay={0.3}>
          <Heading as='h3' variant='section-title'>
            I ❤
          </Heading>
          <Paragraph>
            Art,{' '}
            <Link href="#">Music</Link>
            , Coding, Traveling
          </Paragraph>
        </Section>
        <Section delay={0.3}>
          <Heading as='h3' variant='section-title'>
            On the web
          </Heading>
          <List spacing={2} mb={4}>
            <ListItem>
              <Link href='https://github.com/weonium' target='_blank'>
                <Button p={5} lineHeight={1} variant='ghost' colorScheme='teal' leftIcon={<Icon as={IoLogoGithub} />}>
                  @weonium
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://stackoverflow.com/v.lukashyk' target='_blank'>
                <Button p={5} lineHeight={1} variant='ghost' colorScheme='teal' leftIcon={<Icon as={IoLogoStackoverflow} />}>
                  @weonium
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://linkedin.com/valerian.lukashyk' target='_blank'>
                <Button p={5} lineHeight={1} variant='ghost' colorScheme='teal' leftIcon={<Icon as={IoLogoLinkedin} />}>
                  @weonium
                </Button>
              </Link>
            </ListItem>
          </List>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem href='https://www.youtube.com/' title="Code Madness" thumbnail='/images/youtube.png'>
              My Youtube channel
            </GridItem>
          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
