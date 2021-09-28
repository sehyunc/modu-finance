import { Box, Heading } from '@chakra-ui/react'

import VaultGrid from 'components/VaultGrid'

import useVaults from 'contexts/vaults/useVaults'

const Dashboard = () => {
  const { vaults } = useVaults()

  return (
    <Box p={8}>
      <VaultGrid title="My Vaults" vaults={vaults} />
      <Box pb={8} />
      <VaultGrid title="Watchlist" vaults={vaults} />
    </Box>
  )
}

export default Dashboard
