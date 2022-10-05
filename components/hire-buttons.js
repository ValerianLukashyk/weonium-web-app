import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { IconContext } from 'react-icons'
import { SiUpwork } from 'react-icons/si'
import { Button, Box, Link, useColorModeValue } from '@chakra-ui/react'

const MotionButton = motion(Button)

const HireButtons = props => {
    const [hovered, setHovered] = useState(false)
    const buttonTheme = useColorModeValue('green.300', 'green.300')
    const hoverEvent = () => {
        if (hovered) setHovered(false)
        else setHovered(true)
    }
    return (
        <Box>
            <Link
                href="https://www.upwork.com/freelancers/~0175a80d54377ec0d9"
                target="_blank"
            >
                <MotionButton
                    bg={buttonTheme}
                    style={{
                        transition: 'all 0.2s',
                        marginRight: 8,
                        minWidth: 144
                    }}
                    _hover={{ background: 'yellow.300' }}
                    aria-label="Search database"
                    rightIcon={<Icon hover={hovered} />}
                    color={'red.500'}
                    fontWeight={900}
                    h={50}
                    // border={'1px solid red'}
                    animate={{
                        // borderWidth: [0, 2, 3, 4, 3, 2, 0],
                        scale: [1, 1.04, 1.06, 1.08, 1.1, 1.07, 1],
                        rotate: [0, 0, 7, -7, 7, -7, 0]
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        times: [0, 0.3, 0.6, 0.9, 1.2, 1.6, 1.8],
                        repeat: Infinity,
                        repeatDelay: 0
                    }}
                    onMouseEnter={hoverEvent}
                    onMouseLeave={hoverEvent}
                    {...props}
                >
                    HIRE ME{' '}
                </MotionButton>
            </Link>
        </Box>
    )
}

const Icon = ({ hover }) => {
    const [color, setColor] = useState('white')

    useEffect(() => {
        if (hover) setColor('green')
        else setColor('white')
    }, [hover])
    return (
        <IconContext.Provider
            value={{
                color: color,
                size: hover ? '1.3em' : '1em',
                className: 'global-class-name'
            }}
        >
            <SiUpwork />
        </IconContext.Provider>
    )
}

export default HireButtons
