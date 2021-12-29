import NextLink from 'next/link'
import { Link, useColorModeValue } from '@chakra-ui/react'

export const LinkItem = (props) => {
    const iaCol = useColorModeValue('gray.600', 'whiteAlpha.900')

    const { href, path, color, inactiveColor = iaCol, activeBG, children } = props
    const active = path === href

    const glassTealC = '#202023'

    return (
        <NextLink href={href}>
            <Link
                p={2}
                bg={active ? activeBG ? activeBG : glassTealC : undefined}
                color={active ? color : inactiveColor}
                {...props}
            >
                {children}
            </Link>
        </NextLink>
    )
}