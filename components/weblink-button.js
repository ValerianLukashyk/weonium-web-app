import { Box, Button, Link } from '@chakra-ui/react'

const WebLink = props => {
    const { link, profilename, color, icon } = props
    return (
        <Box>
            <Link my={4} href={link} target="_blank">
                <Button
                    w={[128, 200, 150]}
                    h={[128, 200, 150]}
                    flexDirection="column"
                    justifyContent="space-around"
                    p={6}
                    variant="ghost"
                    colorScheme={color}
                    leftIcon={icon}
                >
                    {profilename}
                </Button>
            </Link>
        </Box>
    )
}
export default WebLink
