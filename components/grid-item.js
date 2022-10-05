import NextLink from 'next/link'
// import  Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay, Image } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export const GridItem = ({ children, href, title, thumbnail }) => (
    <Box w="100%" align="center">
        <LinkBox cursor="pointer">
            <Image
                src={thumbnail}
                alt={title}
                className="grid-item-thumbnail"
                placeholder="blur"
                loading="lazy"
            />
            <LinkOverlay href={href} target="_blank">
                <Text mt={2}>{title}</Text>
            </LinkOverlay>
            <Text fontSize={14}>{children}</Text>
        </LinkBox>
    </Box>
)

export const WorkGridItem = ({ slug, title, thumbnail }) => (
    <Box w="100%" align="center">
        <NextLink href={`/works/${slug}`}>
            <LinkBox cursor="pointer">
                <Image
                    width={['320', '500', '230']}
                    height={['180', '380', '130']}
                    src={
                        process.env.NEXT_PUBLIC_SERVER_URL +
                        ':' +
                        process.env.NEXT_PUBLIC_SERVER_PORT +
                        thumbnail
                    }
                    alt={title}
                    className="grid-item-thumbnail"
                />
                <LinkOverlay href={`/works/${title.toLowerCase()}`}>
                    <Text mt={2} fontSize={20}>
                        {title}
                    </Text>
                </LinkOverlay>
            </LinkBox>
        </NextLink>
    </Box>
)
export const PostGridItem = ({ slug, children, title, thumbnail }) => {
    return (
        <Box w="100%" align="center">
            <NextLink href={`/glworks/${slug}`}>
                <LinkBox cursor="pointer">
                    <Image
                        width={['320', '500', '230']}
                        height={['180', '380', '130']}
                        src={
                            process.env.NEXT_PUBLIC_SERVER_URL +
                            ':' +
                            process.env.NEXT_PUBLIC_SERVER_PORT +
                            thumbnail
                        }
                        alt={title}
                        className="grid-item-thumbnail"
                    />
                    <LinkOverlay href={`/glworks/${title.toLowerCase()}`}>
                        <Text mt={2} fontSize={20}>
                            {title}
                        </Text>
                    </LinkOverlay>
                    <Text fontSize={14}>{children}</Text>
                </LinkBox>
            </NextLink>
        </Box>
    )
}

export const GridItemStyle = () => (
    <Global
        styles={`
        .grid-item-thumbnail {
            border-radius: 12px;
            
            object-fit: cover;
            object-position: top;
        }
    `}
    />
)
