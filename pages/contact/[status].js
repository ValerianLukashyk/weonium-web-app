import { useRouter } from 'next/router'
import {
    Modal,
    ModalOverlay,
    ModalBody,
    Icon,
    Text,
} from '@chakra-ui/react'
import CustomContent from '../../components/modal/custom-content'
import {BiMessageRoundedCheck} from 'react-icons/bi'

const ContactStatus = () => {
    const router = useRouter()

    const title = "Your message sended!"
    const body = (
        <ModalBody display={'flex'} justifyContent={'center'} flexDir={"column"} alignItems={'center'}>
            <Icon as={BiMessageRoundedCheck} w={56} h={56} />
            <Text py={5} fontSize={20}>I&rsquo;ll message you soon...</Text>
        </ModalBody>
    )
    
    return (
        <Modal isOpen={true} onClose={() => router.push('/')} isCentered>
            <ModalOverlay />
            <CustomContent
                title={title}
                body={body}
            />

        </Modal>
    )
}

export default ContactStatus