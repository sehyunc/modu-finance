import AccessibleLink from 'components/AccessibleLink'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Heading,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import AccountModal from 'components/AccountModal'
import Image from 'next/image'

import useWallet from 'contexts/wallet/useWallet'

interface PlatformHeaderProps {
  imageUrl: string
  text: string
  title: string
}

const PlatformHeader: React.FC<PlatformHeaderProps> = ({
  imageUrl,
  text,
  title,
}) => {
  return (
    <Flex py="16" px="4" position="relative">
      <Flex
        basis="50%"
        direction="column"
        grow={1}
        maxWidth="50%"
        minHeight="100%"
        shrink={1}
      >
        <Heading mb="6">{title}</Heading>
        <Text opacity="0.64">{text}</Text>
      </Flex>
      <Flex
        align="center"
        height="100%"
        justify="center"
        maxWidth="50%"
        position="absolute"
        right="0"
        top="0"
        width="600px"
      >
        <Image
          alt="platform-logo"
          height="400px"
          src={imageUrl}
          width="400px"
        />
      </Flex>
    </Flex>
  )
}

export default PlatformHeader
