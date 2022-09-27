import {
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
} from '@chakra-ui/react'
import useStore from '../state/useStore'

const WorkModal = ({ title = 'Add New Post', icon, isRound = false, ...restProps }) => {
    const formData = useStore(state => state.formData)
    const setFormData = useStore(state => state.setFormData)
    const setFormDataImages = useStore(state => state.setFormDataImages)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/works", {
            method: "POST",
            body: formData,
            headers: {
                "Content-type": "multipart/form-data",
                "auth-token": localStorage.getItem('token')
            }
        })
            .then(response => console.log(response))
        
    }
    const handleChange = (e) => {
        setFormData(e.target)

    }
    const handleOnFileChange = (e) => {
        let files = e.target.files;
        setFormDataImages(files)
    }

    

    return (
        <>
            <IconButton
                isRound={isRound}
                aria-label="Add Item"
                icon={icon}
                onClick={onOpen}
            ></IconButton>
            <Modal motionPreset='slideInBottom' size='xl' {...restProps} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
                            <Box display='flex' flexDirection='column' mb={3}>
                                <label htmlFor="title">Title:</label>
                                <input type="text" name="title" id="title" onChange={handleChange} />
                            </Box>
                            <Box display='flex' flexDirection='column' mb={3}>
                                <label htmlFor="period">Period:</label>
                                <input type="text" name="period" id="period" onChange={handleChange} />
                            </Box>
                            <Box display='flex' flexDirection='column' mb={3}>
                                <label htmlFor="description">Description:</label>
                                <textarea type="text" name="description" id="description" onChange={handleChange} />
                            </Box>
                            <Box display='flex' flexDirection='column' mb={3}>
                                <label htmlFor="url">Url:</label>
                                <input type="text" name="url" id="url" onChange={handleChange} />
                            </Box>
                            <Box display='flex' flexDirection='column' mb={3}>
                                <label htmlFor="stack">Stack:</label>
                                <input type="text" name="stack" id="stack" onChange={handleChange} />
                            </Box>
                            <Box display='flex' flexDirection='column' mb={3}>
                                <label htmlFor="images">Images:</label>
                                <input type="file" name="images" multiple id="images" onChange={handleOnFileChange} />
                            </Box>
                            <Box>
                                <input type="submit" />
                            </Box>

                        </form>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default WorkModal