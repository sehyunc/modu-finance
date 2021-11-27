import { useCallback } from 'react'
import { Box } from '@chakra-ui/react'

import { SortDirection, SortColumnOption } from 'pages/leaderboard'

import HeaderItem from './components/HeaderItem'

interface HeaderProps {
  activeSortColumn: SortColumnOption
  handleSetActiveSortColumn: (column: SortColumnOption) => void
  handleSetSortDirection: (direction: SortDirection) => void
  sortDirection: SortDirection
}

const Header: React.FC<HeaderProps> = ({
  activeSortColumn,
  handleSetActiveSortColumn,
  handleSetSortDirection,
  sortDirection,
}) => {
  const handleColumnClick = useCallback(
    (column: SortColumnOption) => {
      handleSetActiveSortColumn(column)
      handleSetSortDirection(sortDirection === 'down' ? 'up' : 'down')
    },
    [handleSetActiveSortColumn, handleSetSortDirection, sortDirection]
  )
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
      <HeaderItem flex={0.5} onClick={() => {}} title="Platformf" />
      <HeaderItem
        direction={activeSortColumn === 'name' ? sortDirection : undefined}
        flex={2}
        onClick={() => handleColumnClick('name')}
        title="Vault Strategy"
      />
      <HeaderItem
        direction={
          activeSortColumn === 'underlyingSymbol' ? sortDirection : undefined
        }
        onClick={() => handleColumnClick('underlyingSymbol')}
        title="Collateral Asset"
      />
      <HeaderItem
        direction={activeSortColumn === 'platform' ? sortDirection : undefined}
        onClick={() => handleColumnClick('platform')}
        title="Platform"
      />
      <HeaderItem
        onClick={() => handleColumnClick('apy')}
        align="right"
        title="Projected APY"
      />
    </Box>
  )
}

export default Header
