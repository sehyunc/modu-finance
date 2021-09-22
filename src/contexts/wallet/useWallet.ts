import { useContext } from "react"

import VaultsContext from "./WalletContext"

const useWallet = () => {
  const wallet = useContext(VaultsContext)
  return wallet
}

export default useWallet
