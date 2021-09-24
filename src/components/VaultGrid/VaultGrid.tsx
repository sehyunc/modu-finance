import React from 'react'
import { Grid, Heading } from '@chakra-ui/react'

import VaultCard from './components/VaultCard'

import { Vault } from 'models/Vault'

interface VaultGridProps {
  title: string
  vaults: Vault[]
}

const VaultGrid: React.FC<VaultGridProps> = ({ title, vaults }) => {
  return (
    <>
      <Heading pb={8}>{title}</Heading>
      <Grid templateColumns="1fr 1fr" gap={10}>
        {vaults.map((vault) => (
          <VaultCard key={vault.id} vault={vault} />
        ))}
      </Grid>
    </>
  )
}

export default VaultGrid
