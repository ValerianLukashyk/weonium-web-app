import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AdsCounter = () => {

    const router = useRouter()
    const { provider } = router.query

    useEffect(()=>{
        if(provider === 'google') router.push(`/`)
    },[router, provider])

    return (
        <div>just a counter ... </div>
    )
}

export default AdsCounter