import { Button, Avatar, AvatarBadge } from '@chakra-ui/react'
import { IconContext } from 'react-icons'
// import useStore from '../state/useStore'

const ProfileButton = ({ wallet }) => {
    // const authProfile = useStore(state => state.authInfo)
    return (
        <IconContext.Provider value={{ size: '1.8em', color: 'red.800' }}>
            <Button mr={3} p={4}>
                <Avatar
                    showBorder
                    ml={-6}
                    name={wallet}
                    src={'/images/icons/metamask.png'}
                >
                    <AvatarBadge
                        borderColor="papayawhip"
                        border
                        bg="green"
                        boxSize="0.8em"
                    />
                </Avatar>
                &nbsp;{wallet}
            </Button>
        </IconContext.Provider>
    )
}

export default ProfileButton
