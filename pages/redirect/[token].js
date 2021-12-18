import { useRouter } from 'next/router'
import useStore from '../../state/useStore'
import { server } from '../../components/api/api'
import { useEffect } from 'react'

const LoginRedirect = ({ href }) => {
    const setAuthInfo = useStore(state => state.setAuthInfo)
    const router = useRouter()
    const { token } = router.query

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            document.cookie = `token=${token}; path=/`;
            server.defaults.headers.common["auth-token"] = localStorage.getItem('token');
            setTimeout(() => {
                server.get('/auth/me')
                    .then((res) => {
                        if (res.status === 200) setAuthInfo(res.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(() => router.push(href || `/profile`))
            }, 500)

        }
    }, [token, href, router, setAuthInfo])

    return (
        <>Redirecting to your profile...</>
    )
}

export default LoginRedirect