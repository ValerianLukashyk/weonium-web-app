import useStore from '../../state/useStore'
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react'
import { server } from '../api/api'
import { IoIosExit } from 'react-icons/io'
import { IconContext } from "react-icons";

const Logout = () => {
    const router = useRouter()
    const setNotIsAuth = useStore(state => state.setNotIsAuth)

    const setLogout = () => {
        setNotIsAuth()
        localStorage.removeItem('token')
        router.push('/')
    }

    const handleLogout = (e) => {
        server.get('/auth/logout')
            .then(function (res) {
                console.log('--------->>>', res)
                if (res.status === 200) {
                    setLogout()
                } else {
                    setLogout()
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <IconContext.Provider value={{ size: "1.8em" }}>
            <Button onClick={handleLogout} mr={3} p={0}>
                <IoIosExit />
            </Button>
        </IconContext.Provider>
    )
}

export default Logout