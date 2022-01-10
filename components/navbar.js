import useStore from '../state/useStore'
import Login from './auth/login'
import Logout from './auth/logout'
import { LinkItem } from './link-item'
import ProfileButton from './profileButton'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Container,
  Box,
  Button,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { IoFingerPrintOutline } from "react-icons/io5";


const Navbar = props => {

  const authInfo = useStore(state => state.authInfo)
  const router = useRouter()
  const { path } = props

  const clrBox = useColorModeValue('#ffffff40', '#20202380')

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={clrBox}
      style={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.xl"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={10}>
          <NextLink href="/" >
            <Heading cursor={'pointer'} as="h1" size="lg" letterSpacing={'tighter'}>
              Valerian Lukashyk
            </Heading>
          </NextLink>

        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/glworks" path={path}>
            WebGL
          </LinkItem>

        </Stack>
        <Box flexGrow={1} align="right">
          <Box >
            {authInfo.isAuth ? (
              <Box ml={2} display={{ base: 'none', md: 'inline-block' }}>
                <ProfileButton />
                <Logout />
              </Box>
            ) : (
              <Box ml={2} display={{ base: 'none', md: 'inline-block' }}>
                <Button mr={4} onClick={()=> router.push('/register')} colorScheme={'blue'} ><IoFingerPrintOutline />&nbsp;Register</Button>
                <Login />
              </Box>
            )}
            <ThemeToggleButton />



            <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
              <Menu isLazy id='1'>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  aria-label="Options"
                />
                <MenuList >
                  <NextLink href="/" passHref>
                    <MenuItem as={Link}>Home</MenuItem>
                  </NextLink>
                  <NextLink href="/works" passHref>
                    <MenuItem as={Link}>Works</MenuItem>
                  </NextLink>
                  <NextLink href="/posts" passHref>
                    <MenuItem as={Link}>WebGL</MenuItem>
                  </NextLink>
                  {authInfo.isAuth ? (<>
                    <MenuItem as={<ProfileButton />}>My Profile</MenuItem>
                    <MenuItem as={<Logout />}>Logout</MenuItem>
                  </>
                  ) : (<>
                    <NextLink href="/register" passHref>
                      <Button mx={4}><IoFingerPrintOutline />&nbsp;Register</Button>
                    </NextLink>
                    <Login />
                  </>
                  )}


                </MenuList>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Container >
    </Box >
  )
}

export default Navbar
