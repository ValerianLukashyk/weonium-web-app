import { Image, Box, Link } from '@chakra-ui/react'
// import React from 'react';

const CoffeeBuy = () => {
    return (
        <Box>
            <Link href="https://www.buymeacoffee.com/lukashykv" target="_blank">
                <Image
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png"
                    alt="Buy Me A Coffee"
                    style={{ height: 50, width: 187 }}
                />
            </Link>
        </Box>
    )
}

export default CoffeeBuy
