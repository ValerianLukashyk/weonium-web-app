import {
    ModalContent,
    ModalHeader,
    ModalCloseButton,
} from '@chakra-ui/react'

const CustomContent = props => {
    const { body, title } = props

    return (
        <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            {body}
        </ModalContent>
    )
}

export default CustomContent