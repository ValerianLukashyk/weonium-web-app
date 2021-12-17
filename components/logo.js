import Link from 'next/link'
import Image from 'next/image'
import { useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
font-weight: bold;
font-size: 18px;
display: inline-flex;
align-items:center;
height: 40px;
line-height: 20px;
padding: 10px;
transition: all 0.2s;
&:hover img {
    transition: all 0.2s;
    transform: translateX(5px);
}
`

const Logo = () => {
  const footPrintImg = `/images/logo-medium${useColorModeValue(
    '-dark',
    ''
  )}.png`

  return (
    <Link href="/">
      <a>
        <LogoBox>
          <Image src={footPrintImg} width={120} height={30} alt="logo" />
        </LogoBox>
      </a>
    </Link>
  )
}

export default Logo
