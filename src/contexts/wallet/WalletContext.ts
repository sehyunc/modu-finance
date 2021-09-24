import { createContext } from 'react'

import { ethers } from 'ethers'

export interface WalletContextValues {
  account?: string
  isConnected: boolean
  onConnectToMetaMask: () => Promise<ethers.providers.Web3Provider | undefined>
  provider?: ethers.providers.Web3Provider
}

const WalletContext = createContext<WalletContextValues>({
  isConnected: false,
  onConnectToMetaMask: () => new Promise(() => {}).then(() => undefined),
})

export default WalletContext
