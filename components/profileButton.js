import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'
// import { IoLockClosed } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import useStore from '../state/useStore'



const ProfileButton = () => {
    const router = useRouter()
    const isAuth = useStore(state => state.authInfo.isAuth)
    const profile = () => {
        router.push('/profile')
    }

    return (
        <IconContext.Provider value={{ size: '1.8em', color: 'red.800' }}>
            <Button onClick={profile} mr={3} p={1}>{isAuth ? <IoLockOpen /> : <IoLockClosed />}</Button>
        </IconContext.Provider>
    )
}

export default ProfileButton