import React, { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'

import useLocalStorage from 'hooks/useLocalStorage'

import WalletContext from './WalletContext'

const WalletProvider: React.FC = ({ children }) => {
  const [previousWalletConnection, setPreviousWalletConnection] =
    useLocalStorage('previousWalletConnection', '')
  const [account, setAccount] = useState<string>()
  const [ethereum, setEthereum] = useState<ethers.providers.ExternalProvider>()
  const [needsSwitchNetwork, setNeedsSwitchNetwork] = useState(false)
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  const handleSetNeedsNetworkChange = useCallback((chainId: number) => {
    console.log("chainId",chainId)
    setNeedsSwitchNetwork(chainId.toString() !== '0x539')
  }, [])

  useEffect(() => {
    if (!ethereum) return
    //@ts-ignore
    ethereum.on('chainChanged', handleSetNeedsNetworkChange)

    return () => {
      //@ts-ignore
      ethereum.off('chainChanged', handleSetNeedsNetworkChange)
    }
  }, [ethereum, handleSetNeedsNetworkChange])

  const handleConnectToMetaMask = useCallback(async () => {
    if (!ethereum) return
    try {
      //@ts-ignore
      const accounts: string[] = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      const provider = new ethers.providers.Web3Provider(ethereum)
      //@ts-ignore
      const chainId: number = await ethereum
        .request({
          method: 'eth_chainId',
        })
        .then(handleSetNeedsNetworkChange)
      setAccount(accounts[0])
      setProvider(provider)
      setPreviousWalletConnection('metamask')
      return provider
    } catch (error) {
      setAccount(undefined)
      setProvider(undefined)
      return undefined
    }
  }, [ethereum, handleSetNeedsNetworkChange, setPreviousWalletConnection])

  const handleRequestSwitchNetwork = useCallback(async () => {
    if (!ethereum) return
    try {
      //@ts-ignore
      const request = await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${(42).toString(16)}` }],
      })
      return request
    } catch (err) {
      console.warn(err)
    }
  }, [ethereum])

  useEffect(() => {
    if (!window) return
    const ethereum = (window as any).ethereum
    setEthereum(ethereum as ethers.providers.ExternalProvider)
  }, [])

  useEffect(() => {
    if (!account && previousWalletConnection === 'metamask') {
      handleConnectToMetaMask()
    }
  }, [account, handleConnectToMetaMask, previousWalletConnection])

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnected: Boolean(account),
        needsSwitchNetwork,
        onConnectToMetaMask: handleConnectToMetaMask,
        onRequestSwitchNetwork: handleRequestSwitchNetwork,
        provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider
