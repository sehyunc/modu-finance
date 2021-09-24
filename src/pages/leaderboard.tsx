import { useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'

import Header from 'components/Leaderboard/components/Header'
import Row from 'components/Leaderboard/components/Row'

import useVaults from 'contexts/vaults/useVaults'

type SortColumnOption = 'name' | 'platform' | 'symbol' | 'apy'
type SortDirection = 'up' | 'down'

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
          return (valA || 0) < (valB || 0) ? -1 : 1
        } else {
          return (valA || 0) > (valB || 0) ? -1 : 1
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
    <>
      <Box
        alignItems="center"
        borderBottom="1px solid #000"
        display="flex"
        height="44px"
        width="100%"
      >
        <Header
          flex={3}
          onClick={() => setActiveSortColumn('name')}
          title="Vault Name"
        />
        <Header
          onClick={() => setActiveSortColumn('platform')}
          title="Platform"
        />
        <Header onClick={() => setActiveSortColumn('symbol')} title="Symbol" />
        <Header
          onClick={() => setActiveSortColumn('apy')}
          align="right"
          title="Projected APY"
        />
      </Box>

      {sortedRows.map((vault) => {
        return <Row key={vault.id} vault={vault} />
      })}
    </>
  )
}

export default Leaderboard
