import React from 'react'
import { Box, Text } from '@chakra-ui/react'

import { Vault } from 'models/Vault'

interface RowProps {
  vault: Vault
}

const Row: React.FC<RowProps> = ({ vault }) => {
  return (
    <Box
      alignItems="center"
      backgroundColor="gray.800"
      borderBottom="3px solid #171923"
      cursor="pointer"
      display="flex"
      px={12}
      py={10}
      height="72px"
      _hover={{ backgroundColor: 'gray.700' }}
    >
      <Box alignItems="center" display="flex" flex={3} justifyContent="left">
        <Text>{vault.name}</Text>
      </Box>
      <Box
        alignItems="center"
        display="flex"
        flex={1}
        justifyContent="left"
        style={{ textTransform: 'capitalize' }}
      >
        <Text>{vault.platform}</Text>
      </Box>
      <Box alignItems="center" display="flex" flex={1} justifyContent="left">
        <Text>{vault.symbol}</Text>
      </Box>
      <Box alignItems="center" display="flex" flex={1} justifyContent="right">
        <Text>{`${String(vault.apy * 100).substr(0, 5)}%`}</Text>
      </Box>
    </Box>
  )
}

export default Row
