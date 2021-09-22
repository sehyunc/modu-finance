import React from "react"

import VaultCard from "components/VaultCard"

import { Vault } from "models/Vault"

interface VaultGridProps {
  vaults: Vault[]
}

const VaultGrid: React.FC<VaultGridProps> = ({ vaults }) => {
  return (
    <div>
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
    </div>
  )
}

export default VaultGrid
