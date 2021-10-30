import { useContext } from 'react'

import VaultsContext from './VaultsContext'

const useVaults = () => {
  const vaults = useContext(VaultsContext)
  return vaults
}

export default useVaults
