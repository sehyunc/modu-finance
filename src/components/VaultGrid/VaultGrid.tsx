import React from 'react'
import { Container, Grid, Heading, Text } from '@chakra-ui/react'

import VaultCard from './components/VaultCard'

import { Vault } from 'models/Vault'

interface VaultGridProps {
  placeholder: string
  title: string
  vaults: Vault[]
}

const VaultGrid: React.FC<VaultGridProps> = ({
  placeholder,
  title,
  vaults,
}) => {
  const Content =
    vaults.length === 0 ? (
      <Text>{placeholder}</Text>
    ) : (
      <Grid templateColumns="1fr 1fr" gap={10}>
        {vaults.map((vault) => (
          <VaultCard key={vault.id} vault={vault} />
        ))}
      </Grid>
    )
  return (
    <Container maxWidth="6xl">
      <Heading pb={8}>{title}</Heading>
      {Content}
    </Container>
  )
}

export default VaultGrid
