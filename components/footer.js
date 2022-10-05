import { Container, Box, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import HireButtons from './hire-buttons'
import CoffeeBuy from './buymeacoffee'
import MotionTitle from './3d-title'
import { useState, useEffect, useRef } from 'react'

const FooterYear = () => {
    // const {width, height} = props
    // const [pos, setPos] = useState({x: Math.round(Math.random()*width), y: Math.round(Math.random() * height)})
    // const [scale, setScale] = useState(1)

    // const randomizePosition = () => {
    //     setPos({x: Math.round(Math.random()*width), y: Math.round(Math.random() * height)})
    //     setScale((Math.random()/4+1))
    // }

    // setInterval(()=>{
    //     randomizePosition()
    // }, 5000)

    return (
        <Box transition="all 0.2s ease-in-out" display={{ base: 'block' }}>
            <Text fontWeight={900} color="whiteAlpha.200" fontSize={40}>
                2022
            </Text>
        </Box>
    )
}

const Footer = props => {
    const footerRef = useRef()
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        console.log(
            footerRef.current.offsetWidth,
            footerRef.current.offsetHeight
        )
        setWidth(footerRef.current.offsetWidth)
        setHeight(footerRef.current.offsetHeight)
    }, [footerRef])

    return (
        <Box
            p={6}
            w="100%"
            bg={useColorModeValue('#ffffff40', '#1a191c80')}
            style={{ backdropFilter: 'blur(10px)' }}
            zIndex={1}
            {...props}
        >
            <Container
                display="flex"
                p={[0, 1, 2]}
                maxW="container.xl"
                wrap="wrap"
                align="center"
                justify="space-between"
            >
                <Flex
                    ref={footerRef}
                    position="relative"
                    align={['start', 'center', 'center']}
                    mr={5}
                    justify="space-between"
                    w="full"
                    px={[0, 5, 16]}
                    flexDir={['column', 'row', 'row']}
                >
                    <Box>
                        <MotionTitle text={'Valerian Lukashyk'} pad={8} />
                    </Box>

                    <Box
                        display="flex"
                        mr={[0, 6, 6]}
                        style={{
                            alignItems: 'center',
                            gap: 50,
                            boxSizing: 'border-box'
                        }}
                    >
                        <HireButtons />
                        <CoffeeBuy />
                    </Box>
                    <FooterYear width={width} height={height} />
                </Flex>
            </Container>
        </Box>
    )
}

export default Footer
