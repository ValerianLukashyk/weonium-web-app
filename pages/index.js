import NextLink from 'next/link'
import {
  Container,
  Box,
  Heading,
  Image,
  Button,
  Link,
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
import { IoLogoLinkedin, IoLogoGithub, IoLogoStackoverflow, IoLogoFacebook } from 'react-icons/io5'


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
          I am a freelance and a full-stack developer based in Ukraine (L&apos;viv) with a passion for building interactive websites. In addition to interactive websites I am expert in creating SPA with React(Next.js) and have an intermediate skill in building back-end part with Node.js. When I&apos;m not writing code I spend time in my audio recording studio.
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
            I ❤
          </Heading>
          <Paragraph>
            Music, 
            Coding,
            Art,
            Traveling
          </Paragraph>
        </Section>
        <Section delay={0.3}>
          <Heading as='h3' variant='section-title'>
            On the web
          </Heading>
          <List spacing={2} mb={4}>
            <ListItem>
              <Link href='https://facebook.com/lukashyk.v' target='_blank'>
                <Button p={5} lineHeight={1} variant='ghost' colorScheme='facebook' leftIcon={<Icon as={IoLogoFacebook} />}>
                  @lukashyk.v
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://linkedin.com/valerian.lukashyk' target='_blank'>
                <Button p={5} lineHeight={1} variant='ghost' colorScheme='linkedin' leftIcon={<Icon as={IoLogoLinkedin} />}>
                  @valerian.lukashyk
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://github.com/ValerianLukashyk' target='_blank'>
                <Button p={5} lineHeight={1} variant='ghost' colorScheme='#161B22' leftIcon={<Icon as={IoLogoGithub} />}>
                  @ValerianLukashyk
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://stackoverflow.com/story/v.lukashyk' target='_blank'>
                <Button p={5} lineHeight={1} variant='ghost' colorScheme='stackoverflow' leftIcon={<Icon as={IoLogoStackoverflow} />}>
                  @v.lukashyk
                </Button>
              </Link>
            </ListItem>

          </List>

        </Section>
      </Container>
    </Layout>
  )
}

export default Page
