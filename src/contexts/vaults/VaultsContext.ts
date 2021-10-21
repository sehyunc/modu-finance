import { createContext } from 'react'

import { Vault } from 'models/Vault'

export interface VaultsContextValues {
  fontisVaults: Vault[]
  ribbonVaults: Vault[]
  stakeDAOVaults : Vault[]
  onIdToVault: (vaultIds: string[]) => Vault[]
  vaults: Vault[]
}

const VaultsContext = createContext<VaultsContextValues>({
  fontisVaults: [],
  ribbonVaults: [],
  stakeDAOVaults : [],
  onIdToVault: (vaultIds: string[]) => [],
  vaults: [],
})

export default VaultsContext
