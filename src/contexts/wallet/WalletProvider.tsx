import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { ethers } from 'ethers'

import useLocalStorage from 'hooks/useLocalStorage'

import WalletContext from './WalletContext'

const WalletProvider: React.FC = ({ children }) => {
  const [previousWalletConnection, setPreviousWalletConnection] =
    useLocalStorage('previousWalletConnection', '')
  const [account, setAccount] = useState<string>()
  const [ethereum, setEthereum] = useState<ethers.providers.ExternalProvider>()
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  const handleConnectToMetaMask = useCallback(async () => {
    if (!ethereum) return
    try {
      const accounts: string[] = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      const provider = new ethers.providers.Web3Provider(ethereum)
      setAccount(accounts[0])
      setProvider(provider)
      setPreviousWalletConnection('metamask')
      return provider
    } catch (error) {
      setAccount(undefined)
      setProvider(undefined)
      return undefined
    }
  }, [ethereum, setPreviousWalletConnection])

  useEffect(() => {
    const ethereum = (window as any).ethereum
    setEthereum(ethereum as ethers.providers.ExternalProvider)
  }, [])

  useEffect(() => {
    if (previousWalletConnection === 'metamask') {
      handleConnectToMetaMask()
    }
  }, [handleConnectToMetaMask, previousWalletConnection])

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnected: Boolean(account),
        onConnectToMetaMask: handleConnectToMetaMask,
        provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider
