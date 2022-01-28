
import React, { useEffect, useState } from 'react';
import { Box, Button, Link, useColorModeValue} from '@chakra-ui/react'
import { IconContext } from 'react-icons'
import { SiUpwork } from 'react-icons/si'

const HireButtons = (props) => {
    const [hovered, setHovered] = useState(false)
    const buttonTheme = useColorModeValue('gray.700', 'whiteAlpha.300')
    const hoverEvent = () => {
        if (hovered) setHovered(false)
        else setHovered(true)
    }
    return (
        <Box>
            <Link href='https://www.upwork.com/freelancers/~0175a80d54377ec0d9' target='_blank'>
                <Button
                    bg={buttonTheme}
                    style={{transition: 'transform 0.1s'}}
                    _hover={{transform: 'scale(1.1)', background: 'yellow.300'}}
                    aria-label='Search database'
                    rightIcon={<Icon hover={hovered} />}
                    color={'red.400'} 
                    fontWeight={900}
                    onMouseEnter={hoverEvent}
                    onMouseLeave={hoverEvent}
                    {...props}
                >Hire me </Button>
            </Link>
        </Box>
    )
};

const Icon = ({ hover }) => {
    const [color, setColor] = useState("white")

    useEffect(() => {
        if (hover) setColor('green')
        else setColor('white')
    }, [hover])
    return (
        <IconContext.Provider value={{ color: color, size: hover ? '1.3em' : "1em", className: "global-class-name" }}>
            <SiUpwork />
        </IconContext.Provider>
    )
}

export default HireButtons
