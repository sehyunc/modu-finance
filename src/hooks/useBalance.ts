import { useCallback, useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"

import erc20Abi from "constants/abi/erc20.json"

import useWallet from "contexts/wallet/useWallet"

const useBalance = (address: string | undefined, isNative?: boolean) => {
  const [balance, setBalance] = useState<BigNumber>()
  const { account, provider } = useWallet()

  const fetchBalance = useCallback(async () => {
    if (!account || !address || !provider) {
      return
    }

    let balance: BigNumber | undefined = undefined
    try {
      if (isNative) {
        balance = await provider.getBalance(account)
      } else {
        const tokenContract = new ethers.Contract(address, erc20Abi, provider)
        balance = await tokenContract.balanceOf(account)
      }
    } catch (e) {
      console.error(e)
    }
    setBalance(balance)
  }, [account, address, isNative, provider])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  useEffect(() => {
    setBalance(undefined)
  }, [account, address, setBalance])

  useEffect(() => {
    const interval = setInterval(fetchBalance, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [fetchBalance])

  return balance
}

export default useBalance
