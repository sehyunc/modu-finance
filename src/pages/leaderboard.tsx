import { useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'

import Header from 'components/Leaderboard/components/Header'
import Row from 'components/Leaderboard/components/Row'

import useVaults from 'contexts/vaults/useVaults'

export type SortColumnOption = 'name' | 'platform' | 'symbol' | 'apy'
export type SortDirection = 'up' | 'down'

const Leaderboard = () => {
  const { vaults } = useVaults()
  const [activeSortColumn, setActiveSortColumn] =
    useState<SortColumnOption>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('down')

  const sortedRows = useMemo(() => {
    return vaults.sort((vaultA, vaultB) => {
      let valA
      let valB
      if (activeSortColumn === 'apy') {
        valA = vaultA.apy
        valB = vaultB.apy
        if (sortDirection === 'down') {
          return (valA || 0) > (valB || 0) ? -1 : 1
        } else {
          return (valA || 0) < (valB || 0) ? -1 : 1
        }
      } else {
        valA = vaultA[activeSortColumn]?.trim()
        valB = vaultB[activeSortColumn]?.trim()
        if (sortDirection === 'down') {
          return (valA || 0) < (valB || 0) ? -1 : 1
        } else {
          return (valA || 0) > (valB || 0) ? -1 : 1
        }
      }
    })
  }, [activeSortColumn, sortDirection, vaults])

  return (
    <Box p={12}>
      <Header
        handleSetActiveSortColumn={setActiveSortColumn}
        handleSetSortDirection={setSortDirection}
        sortDirection={sortDirection}
      />
      {sortedRows.map((vault) => {
        return <Row key={vault.id} vault={vault} />
      })}
      <Box
        backgroundColor="gray.800"
        borderBottomEndRadius="10px"
        borderBottomStartRadius="10px"
        height="30px"
      ></Box>
    </Box>
  )
}

export default Leaderboard
