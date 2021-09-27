import React from 'react'
import { Box } from '@chakra-ui/react'

import { SortColumnOption } from 'pages/leaderboard'

import HeaderItem from './components/HeaderItem'

interface HeaderProps {
  handleSetActiveSortColumn: (column: SortColumnOption) => void
}

const Header: React.FC<HeaderProps> = ({ handleSetActiveSortColumn }) => {
  return (
    <Box
      alignItems="center"
      backgroundColor="gray.800"
      borderBottom="3px solid #171923"
      borderTopLeftRadius="10px"
      borderTopRightRadius="10px"
      display="flex"
      height="44px"
      px={12}
      py={8}
      width="100%"
    >
      <HeaderItem
        flex={3}
        onClick={() => handleSetActiveSortColumn('name')}
        title="Vault Name"
      />
      <HeaderItem
        onClick={() => handleSetActiveSortColumn('platform')}
        title="Platform"
      />
      <HeaderItem
        onClick={() => handleSetActiveSortColumn('symbol')}
        title="Symbol"
      />
      <HeaderItem
        onClick={() => handleSetActiveSortColumn('apy')}
        align="right"
        title="Projected APY"
      />
    </Box>
  )
}

export default Header
