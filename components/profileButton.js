import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { IoIosPerson } from 'react-icons/io'
import { IconContext } from 'react-icons'

const ProfileButton = () => {
    const router = useRouter()

    const profile = () => {
        router.push('/profile')
    }

    return (
        <IconContext.Provider value={{ size: '1.8em' }}>
            <Button onClick={profile} mr={3} p={1}><IoIosPerson /></Button>
        </IconContext.Provider>
    )
}

export default ProfileButton