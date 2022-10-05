import { Heading, Box, Text } from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'

const MotionTitle = props => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const [hover, setHover] = useState(false)
    const titleRef = useRef()
    const textRef = useRef()

    const { text, pad } = props

    useEffect(() => {
        if (hover) {
            titleRef.current.style.transform = `perspective(300px) scale(1.4) rotateY(${
                mouse.x / 5 + 'deg'
            }) rotateX(${-mouse.y / 2 + 'deg'})`
            textRef.current.style.transform = `perspective(300px) scale(1.2) translateY(15px)`
        } else {
            titleRef.current.style.transform = `perspective(300px) scale(1) rotateY(0deg) rotateX(0deg)`
            textRef.current.style.transform = `perspective(300px) scale(1) translateY(0)`
        }
    }, [hover, mouse])

    const handleMouse = e => {
        setMouse({
            x: e.nativeEvent.offsetX - e.target.clientWidth / 2,
            y: e.nativeEvent.offsetY - e.target.clientHeight / 2
        })
    }

    return (
        <Box
            p={pad}
            cursor={'move'}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseMove={handleMouse}
        >
            {/* <Heading  _hover={{ transform: `perspective(300px) translate3d(0px,0px,75px) rotateY(${mouse.x / 5 + 'deg'}) rotateX(${-mouse.y / 2 + 'deg'})` }} ref={titleRef} as="h1" size="md" transition="transform 0.1s" letterSpacing={'tighter'} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onMouseMove={handleMouse} > */}
            <Heading
                transition="all 0.2s"
                ref={titleRef}
                as="h1"
                size="md"
                letterSpacing={'tighter'}
            >
                {text}
            </Heading>
            <Text ref={textRef} transition="all 0.2s" py={[3, 0]}>
                Full-stack Interactive Developer
            </Text>
        </Box>
    )
}

export default MotionTitle
