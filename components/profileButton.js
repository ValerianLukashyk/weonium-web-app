import { useRouter } from 'next/router'
import { Button, Avatar, AvatarBadge } from '@chakra-ui/react'
import { IconContext } from 'react-icons'
import useStore from '../state/useStore'

const ProfileButton = () => {
    const router = useRouter()
    const authProfile = useStore(state => state.authInfo)
    window.APP = authProfile
    return (
        <IconContext.Provider value={{ size: '1.8em', color: 'red.800' }}>
            <Button onClick={() => router.push('/profile')} mr={3} p={4}>
                <Avatar
                    showBorder
                    ml={-6}
                    name={authProfile.displayName}
                    src={authProfile.picture || null}
                >
                    <AvatarBadge
                        borderColor="papayawhip"
                        border
                        bg="green"
                        boxSize="0.8em"
                    />
                </Avatar>
                &nbsp;Profile
            </Button>
        </IconContext.Provider>
    )
}

export default ProfileButton
