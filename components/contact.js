import { IconButton,Tooltip  } from '@chakra-ui/react'
import { AiOutlineMessage } from 'react-icons/ai'
import { motion } from 'framer-motion'



const Contact = () => {
    const MotionIconButton = motion(IconButton)


    return (
        <Tooltip label='Contact me' placement='top' defaultIsOpen>
            <MotionIconButton
                position='fixed'
                bottom={10}
                right={10}
                zIndex={10}
                isRound
                colorScheme='blue'
                aria-label='Send message'
                size='lg'
                variant='ghost'
                icon={
                    <AiOutlineMessage size={40} />
                }
                animate={{
                    scale: [1, 1, 1.5, 1.5, 1.5, 1.5, 1],
                    rotate: [0, 0, 45, -45, 45, -45, 0],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.3, 0.4, 0.5,0.6, 0.8],
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
            />
        </Tooltip>
    )
}

export default Contact