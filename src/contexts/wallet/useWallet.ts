import { useContext } from 'react'

import WalletContext from './WalletContext'

const useWallet = () => {
  const wallet = useContext(WalletContext)
  return wallet
}

export default useWallet
