import NextLink from 'next/link'
import { Link, useColorModeValue } from '@chakra-ui/react'

export const LinkItem = props => {
    const iaCol = useColorModeValue('gray.600', 'whiteAlpha.900')

    const {
        href,
        path,
        color,
        inactiveColor = iaCol,
        activeBG,
        children
    } = props
    const active = path === href
    const activeColor = useColorModeValue('whiteAlpha.900', 'gray.800')

    return (
        <NextLink href={href}>
            <Link
                p={2}
                bg={active ? (activeBG ? activeBG : 'glassTeal') : undefined}
                color={active ? color || activeColor : inactiveColor}
                {...props}
            >
                {children}
            </Link>
        </NextLink>
    )
}
