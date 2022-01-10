import { Image, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton  } from '@chakra-ui/react'


const ModalScreenshot = (props) => {
    const { section, openedImg } = props

    return (
        <>
            {section.screenshots && (
                <Modal onClose={onClose} size='full' isOpen={isOpen} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton position='fixed' w={50} h={50} right={50} top={4} />
                        <ModalBody>
                            <Image onDoubleClick={onClose} w='full' alt={'screenshot main'} src={openedImg} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}

export default ModalScreenshot