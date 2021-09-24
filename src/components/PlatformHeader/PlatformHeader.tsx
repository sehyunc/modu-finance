import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'

import Image from 'next/image'

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
    <Box backgroundColor="#000000">
      <Container maxWidth="6xl">
        <Flex py="16" px="4" position="relative">
          <Flex direction="column" maxWidth="50%" minHeight="100%">
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
          >
            <Image
              alt="platform-logo"
              height="400px"
              src={imageUrl}
              width="400px"
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default PlatformHeader
