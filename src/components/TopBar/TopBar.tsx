import { Button, Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import React from 'react'

import { SymbolToColorMap } from 'components/VaultGrid/components/VaultCard/constants'

interface Props {}

const TopBar = (props: Props) => {
  const router = useRouter()
  const pathname = router.pathname
  const background = 'linear(to-r, #3498db, #60ebfc)'
  return (
    <Box
      alignItems="center"
      display="flex"
      flex={1}
      marginTop={6}
      justifyContent="center"
    >
      <Text
        bgGradient={`linear(to-r, ${SymbolToColorMap.WETH.start}, ${SymbolToColorMap.WETH.end})`}
        bgClip="text"
        fontWeight="bold"
        fontSize={{ base: '7vw', md: '4xl', xl: '50px' }}
      >
        Vault Leaderboard
      </Text>
    </Box>
  )
}

export default TopBar
