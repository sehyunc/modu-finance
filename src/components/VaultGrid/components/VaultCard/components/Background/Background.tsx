import { Image } from '@chakra-ui/react'
import { Symbol } from 'models/types'

interface BackgroundProps {
  underlyingSymbol: Symbol
}

const Background: React.FC<BackgroundProps> = ({ underlyingSymbol }) => {
  return (
    <Image
      src={`/static/${underlyingSymbol.toLowerCase()}.svg`}
      alt="logo"
      minH="100%"
      minW="100%"
      transformOrigin="50% 50%"
      maxWidth="150%"
      position="absolute"
      userSelect="none"
      right="0"
      transition={`
    transform 0.5s cubic-bezier(0, 0.28, 0.45, 0.95)
  `}
      _hover={{
        transition: `
      transform 0.5s cubic-bezier(0, 0.28, 0.45, 0.95),
      box-shadow 0.5s cubic-bezier(0, 0.28, 0.45, 0.95)
      `,
        transform: 'scale(1.2)',
      }}
    />
  )
}

export default Background
