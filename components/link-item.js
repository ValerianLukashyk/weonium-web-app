import NextLink from 'next/link'
import { Link, useColorModeValue } from '@chakra-ui/react'

export const LinkItem = ({ href, path, children }) => {

    const active = path === href
    const inactiveColor = useColorModeValue('red.300', 'whiteAlpha.900')

    return (
        <NextLink href={href}>
            <Link
                p={2}
                bg={active ? 'glassTeal' : undefined}
                color={active ? '#202023' : inactiveColor}
            >
                {children}
            </Link>
        </NextLink>
    )
}