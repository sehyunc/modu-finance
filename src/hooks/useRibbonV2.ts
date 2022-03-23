import useWallet from 'contexts/wallet/useWallet'
import { RibbonThetaV2Abi__factory } from 'contracts/factories/RibbonThetaV2Abi__factory'
import { BigNumber, constants, Signer, utils } from 'ethers'
import { useCallback, useMemo } from 'react'

const useVaultContract = (vaultAddress: string) => {
  const { provider } = useWallet()

  const vaultContract = useMemo(() => {
    if (!provider) return
    return RibbonThetaV2Abi__factory.connect(vaultAddress, provider.getSigner())
  }, [provider, vaultAddress])

  const handleApprove = useCallback(
    async (vaultAddress: string, tokenContract, balance: BigNumber) => {
      if (!vaultContract) return
      const txHash = await vaultContract
        .approve(vaultAddress, balance)
        .then((tx) => tx.hash)
        .catch((e) => console.log(e))
      return txHash
    },
    [vaultContract]
  )

  const handleDepositEth = useCallback(
    async (
      value: number,
      decimals: number,
      signer?: Signer,
      uuid?: string,
      tokenIndex?: number
    ) => {
      if (!vaultContract) return
      const amount = utils.parseUnits(String(value), decimals)
      const txHash = await vaultContract
        .depositETH({ value: amount })
        .then((tx) => tx.hash)
        .catch((e) => console.log(e))
      return txHash
    },
    [vaultContract]
  )

  const handleDepositErc20 = useCallback(
    async (
      value: number,
      decimals: number,
      signer?: Signer,
      uuid?: string,
      tokenIndex?: number
    ) => {
      if (!vaultContract) return
      const amount = utils.parseUnits(String(value), decimals)
      const txHash = await vaultContract
        .deposit(amount)
        .then((tx) => tx.hash)
        .catch((e) => console.log(e))
      return txHash
    },
    [vaultContract]
  )

  const handleWithdraw = useCallback(
    async (
      value: number,
      decimals: number,
      signer?: Signer,
      uuid?: string,
      tokenIndex?: number
    ) => {
      if (!vaultContract) return
      const amount = utils.parseUnits(String(value), decimals)
      const txHash = await vaultContract
        .withdrawInstantly(amount)
        .then((tx) => tx.hash)
        .catch((e) => console.log(e))
      return txHash
    },
    [vaultContract]
  )

  return {
    approve: handleApprove,
    depositETH: handleDepositEth,
    depositErc20: handleDepositErc20,
    withdraw: handleWithdraw,
  }
}

export default useVaultContract
