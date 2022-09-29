import NextLink from 'next/link'
import {
  Container, Box, Flex, Heading, Image, Button, Icon, List, ListItem, useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import WebLink from '../components/weblink-button'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import { IoLogoLinkedin, IoLogoGithub, IoLogoStackoverflow, IoLogoFacebook } from 'react-icons/io5'
import { TiHtml5, TiCss3 } from 'react-icons/ti'
import { SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiWebgl, SiThreedotjs } from 'react-icons/si'
import HireButtons from '../components/hire-buttons'

const Page = () => {
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
          Hello, I&apos;m a full-stack developer based in Ukraine!
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Valerian Lukashyk
            </Heading>
            <p>Digital Buddha (Full-stack Interactive Developer)</p>
            <HireButtons w={["full", 320, 350]} my={5} />
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
            Work
          </Heading>
          <Paragraph>
            I am a freelance and a full-stack developer based in Ukraine (L&apos;viv) with a passion for building interactive websites. I&apos;m using Three.js library and GL Shader Language for adding interactivity to 3D objects. In addition I am expert in Js-frameworks like React.js(Next.js) and Vue.js. More than 1 year I&apos;m learning to write back-end with Node.js. When I&apos;m not writing code I spend time in my audio recording studio.
          </Paragraph>
          <Box align='center' justify="space-between" my={4}>
            <NextLink href="/works">
              <Button
                rightIcon={<ChevronRightIcon />} colorScheme='teal' mx={5} my={3}
              >FullStack Portfolio
              </Button>
            </NextLink>
            <NextLink href="/glworks">
              <Button
                rightIcon={<ChevronRightIcon />} colorScheme='red' mx={5} my={3}
              >WebGL Portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>
        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>1990</BioYear>
            Born in L&apos;viv, Ukraine.
          </BioSection>
          <BioSection>
            <BioYear>2012</BioYear>
            Completed Kyiv International Univercity, Information Science cafedra.
          </BioSection>
          <BioSection>
            <BioYear>2018 to present</BioYear>
            Works as a freelance
          </BioSection>
          <BioSection>
            <BioYear>2021 to present</BioYear>
            Works in Digital Agency Weonium
          </BioSection>
        </Section>
        <Section delay={0.3}>
          <Heading as='h3' variant='section-title'>
            My specs
          </Heading>
          <Flex style={{ gap: 10, flexWrap: 'wrap' }}>
            <Icon color="red.300" w={16} h={16} as={TiHtml5} />
            <Icon color="blue.500" w={16} h={16} as={TiCss3} />
            <Icon color="yellow.300" w={16} h={16} as={SiJavascript} />
            <Icon color="blue.300" w={16} h={16} as={SiReact} />
            <Icon color="green.300" w={16} h={16} as={SiNextdotjs} />
            <Icon color="green.700" w={16} h={16} as={SiNodedotjs} />
            <Icon color="red.700" w={16} h={16} as={SiWebgl} />
            <Icon color="whiteAlpha.800" w={16} h={16} as={SiThreedotjs} />
          </Flex>
        </Section>
        <Section delay={0.3}>
          <Heading as='h3' variant='section-title'>
            I ❤
          </Heading>
          <Paragraph>
            Coding,
            Music,
            Art,
            Traveling
          </Paragraph>
        </Section>
        <Section delay={0.3}>
          <Heading as='h3' variant='section-title'>
            On the web
          </Heading>
          <List d="flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }} mb={4}>
            <ListItem m={1} >
              <WebLink
                name="Facebook"
                link="https://facebook.com/lukashyk.v"
                profilename="@lukashyk.v"
                color="blue"
                icon={<Icon w={12} h={12} as={IoLogoFacebook} />}
              />
            </ListItem>
            <ListItem m={1}>
              <WebLink
                fontSize={14}
                name="Linkedin"
                link="https://linkedin.com/valerian.lukashyk"
                profilename="@valerian.lukashyk"
                color="linkedin"
                icon={<Icon w={12} h={12} as={IoLogoLinkedin} />}
              />
            </ListItem>
            <ListItem m={1}>
              <WebLink
                fontSize={14}
                name="Github"
                link="https://github.com/ValerianLukashyk"
                profilename="@ValerianLukashyk"
                color={"green"}
                icon={<Icon w={12} h={12} as={IoLogoGithub} />}
              />
            </ListItem>
            <ListItem m={1}>
              <WebLink
                name="Stackoverflow"
                link="https://stackoverflow.com/story/v.lukashyk"
                profilename="@v.lukashyk"
                color={"orange"}
                icon={<Icon w={12} h={12} as={IoLogoStackoverflow} />}
              />
            </ListItem>
          </List>
        </Section>
      </Container>
      
    </Layout>
  )
}



export default Page
