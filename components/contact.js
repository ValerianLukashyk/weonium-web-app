import {
    IconButton, Box,
     useColorModeValue
} from '@chakra-ui/react'
import { AiOutlineMessage } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';

const MotionIconButton = motion(IconButton)

const Contact = () => {
    const router = useRouter()
    const color = useColorModeValue("white", "white")
    const variant = useColorModeValue("solid", "ghost")

    return (
        <Box>
            <MotionIconButton
                onClick={()=> router.push('/contact')}
                position='fixed'
                bottom={"42px"}
                right={10}
                zIndex={10}
                isRound
                colorScheme='lime'
                aria-label='Send message'
                size='lg'
                variant={variant}
                icon={
                    <AiOutlineMessage color={color} size={40} />
                }
                animate={{
                    scale: [1, 1, 1.5, 1.5, 1.5, 1.5, 1],
                    rotate: [0, 0, 45, -45, 45, -45, 0],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8],
                    repeat: Infinity,
                    repeatDelay: 3
                }}
            />
            
        </Box>
    )
}

export default Contact