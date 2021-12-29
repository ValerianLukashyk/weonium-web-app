import { useRouter } from 'next/router'
import { Button, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
// import { IoLockClosed } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { IoLockClosed, IoLockOpen, IoPersonOutline } from "react-icons/io5";
import useStore from '../state/useStore'


const ProfileButton = () => {
    const router = useRouter()
    const authProfile = useStore(state => state.authInfo)
    const profile = () => {
        router.push('/profile')
    }

    return (
        <IconContext.Provider value={{ size: '1.8em', color: 'red.800' }}>

            <Button onClick={profile} mr={3} p={4}>
                <Avatar showBorder ml={-6} onClick={profile} name='Valerian Lukashyk' src={authProfile.picture ? authProfile.picture : <IoPersonOutline />} >
                    <AvatarBadge borderColor='papayawhip' border bg='green' boxSize='0.8em' />
                </Avatar>
                &nbsp;Profile
            </Button>
        </IconContext.Provider>
    )
}

export default ProfileButton