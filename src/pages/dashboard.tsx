import { Box } from '@chakra-ui/react'

import VaultGrid from 'components/VaultGrid'

import useVaults from 'contexts/vaults/useVaults'
import useWatchlist from 'contexts/watchlist/useWatchlist'

const Dashboard = () => {
  const { onIdToVault, vaults } = useVaults()
  const { watchlist } = useWatchlist()

  const watchlistVaults = onIdToVault(watchlist)

  return (
    <Box p={8}>
      <VaultGrid title="My Vaults" vaults={[]} />
      <Box pb={8} />
      <VaultGrid title="Watchlist" vaults={watchlistVaults} />
    </Box>
  )
}

export default Dashboard
