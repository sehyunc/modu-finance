import { Box, Heading } from '@chakra-ui/react'

import VaultGrid from 'components/VaultGrid'

import useVaults from 'contexts/vaults/useVaults'

const Dashboard = () => {
  const { vaults } = useVaults()

  return (
    <Box p={8}>
      <Heading pb={8}>My Vaults</Heading>
      <VaultGrid vaults={vaults} />
      <Heading py={8}>Watchlist</Heading>
      <VaultGrid vaults={vaults} />
    </Box>
  )
}

export default Dashboard
