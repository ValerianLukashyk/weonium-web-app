import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export const GridItem = ({ children, href, title, thumbnail }) => (
    <Box w='100%' align='center'>
        <LinkBox cursor='pointer'>
            <Image src={thumbnail} alt={title} className='grid-item-thumbnail' placeholder='blur' loading='lazy' />
            <LinkOverlay href={href} target="_blank">
                <Text mt={2}>{title}</Text>
            </LinkOverlay>
            <Text fontSize={14}>{children}</Text>
        </LinkBox>
    </Box>
)


export const WorkGridItem = ({ title, thumbnail }) => (
    <Box w='100%' align='center'>
        <NextLink href={`/works/${title}`}>
            <LinkBox cursor='pointer'>
                <Image width='230' height='130' src={thumbnail} alt={title} className='grid-item-thumbnail' />
                <LinkOverlay href={`/works/${title.toLowerCase()}`}>
                    <Text mt={2} fontSize={20}>
                        {title}
                    </Text>
                </LinkOverlay>
            </LinkBox>
        </NextLink>
    </Box>
)
export const PostGridItem = ({ children, id, title, thumbnail }) => {

    return (
        <Box w='100%' align='center' >
            <NextLink href={`/posts/${title}?id=${id}`}>
                <LinkBox cursor='pointer'>
                    <Image src={thumbnail} alt={title} className='grid-item-thumbnail' placeholder="blur" />
                    <LinkOverlay href={`/posts/${title}?id=${id}`}>
                        <Text mt={2} fontSize={20}>
                            {title}
                        </Text>
                    </LinkOverlay>
                    <Text fontSize={14} >{children}</Text>
                </LinkBox>
            </NextLink>
        </Box>
    )
}

export const GridItemStyle = () => (
    <Global styles={`
        .grid-item-thumbnail {
            border-radius: 12px;
            width: 233px;
            height: 150px;
            object-fit: cover;
            object-position: top;
        }
    `}
    />
)