import { createContext } from 'react'

import { Vault } from 'models/Vault'

export interface VaultsContextValues {
  vaults: Vault[]
  fontisVaults: Vault[]
  ribbonVaults: Vault[]
}

const VaultsContext = createContext<VaultsContextValues>({
  vaults: [],
  fontisVaults: [],
  ribbonVaults: [],
})

export default VaultsContext
