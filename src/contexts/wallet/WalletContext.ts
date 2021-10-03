import { createContext } from 'react'

import { ethers } from 'ethers'

export interface WalletContextValues {
  account?: string
  isConnected: boolean
  needsSwitchNetwork: boolean
  onConnectToMetaMask: () => Promise<ethers.providers.Web3Provider | undefined>
  onRequestSwitchNetwork: () => Promise<void>
  provider?: ethers.providers.Web3Provider
}

const WalletContext = createContext<WalletContextValues>({
  isConnected: false,
  needsSwitchNetwork: false,
  onConnectToMetaMask: () => new Promise(() => {}).then(() => undefined),
  onRequestSwitchNetwork: () => new Promise(() => {}).then(() => undefined),
})

export default WalletContext
