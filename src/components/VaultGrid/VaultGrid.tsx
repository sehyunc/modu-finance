import React from "react"
import { Grid } from "@chakra-ui/react"

import VaultCard from "./components/VaultCard"

import { Vault } from "models/Vault"

interface VaultGridProps {
  vaults: Vault[]
}

const VaultGrid: React.FC<VaultGridProps> = ({ vaults }) => {
  console.log("🚀 ~ vaults", vaults)
  return (
    <Grid templateColumns="1fr 1fr" gap={10}>
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
    </Grid>
  )
}

export default VaultGrid
