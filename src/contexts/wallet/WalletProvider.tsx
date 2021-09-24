import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { ethers } from 'ethers'

import WalletContext from './WalletContext'

const WalletProvider: React.FC = ({ children }) => {
  const [connectWalletIsOpen, setConnectWalletIsOpen] = useState(false)
  const [account, setAccount] = useState<string>('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  const [ethereum, setEthereum] = useState<ethers.providers.ExternalProvider>()

  useEffect(() => {
    const ethereum = (window as any).ethereum
    setEthereum(ethereum as ethers.providers.ExternalProvider)
  }, [])

  const handleConnect = useCallback(() => {
    setConnectWalletIsOpen(true)
  }, [])

  const handleConnectToMetaMask = useCallback(async () => {
    if (!ethereum) return

    try {
      const accounts: string[] = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      const provider = new ethers.providers.Web3Provider(ethereum)
      setConnectWalletIsOpen(false)
      setAccount(accounts[0])
      setProvider(provider)
      return provider
    } catch (error) {
      setAccount('')
      setProvider(undefined)
      return undefined
    }
  }, [ethereum])

  return (
    <WalletContext.Provider
      value={{
        account,
        provider,
        onConnect: handleConnect,
        onConnectToMetaMask: handleConnectToMetaMask,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider
