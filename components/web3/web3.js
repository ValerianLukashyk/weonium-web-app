// import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { Button, Image } from '@chakra-ui/react'
import useStore from '../../state/useStore'
import { useEffect, useRef } from 'react'
import ProfileButton from '../profileButton'
// import { useEffect } from 'react'

const Web3Connector = () => {
    const isConnected = useStore(state => state.isConnected)
    // const connectedWallet = useStore(state => state.connectedWallet)
    const hiddenWallet = useStore(state => state.hiddenWallet)
    const setOnline = useStore(state => state.setOnline)
    const Web3ModalRef = useRef()

    useEffect(() => {
        Web3ModalRef.current = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: true, // optional
            providerOptions: {}
        })
    }, [])

    const connect = async () => {
        const provider = await Web3ModalRef.current.connect()
        console.log(provider.selectedAddress)
        const { selectedAddress } = provider
        // const web3 = new Web3(provider)
        setOnline(true, selectedAddress)
        
        // await web3.eth.getAccounts().then(console.log);
        // await web3.eth.getBalance(selectedAddress)
        // .then(console.log);
    }

    return (
        <>
            {
            isConnected ? 
            <ProfileButton wallet={hiddenWallet}/>
            :
            <Button mr={4} onClick={() => connect()}>
                <Image
                    width={30}
                    src="/images/icons/metamask.png"
                    alt="metamask icon"
                />
            </Button>
            }
        </>
    )
}

export default Web3Connector
