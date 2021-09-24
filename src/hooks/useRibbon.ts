import { useEffect, useState } from 'react'
import { BigNumber, BigNumberish, ethers } from 'ethers'

import ribbonthetavault from 'constants/abi/ribbonthetavault.json'

import useWallet from 'contexts/wallet/useWallet'

import { convertNumberToBigNumber } from 'utils/helpers'

const useRibbon = (vaultAddress: string) => {
  const [contract, setContract] = useState<ethers.Contract>()
  const { provider } = useWallet()

  useEffect(() => {
    async function loadContracts() {
      if (provider) {
        const signer = provider.getSigner()
        try {
          const c = new ethers.Contract(vaultAddress, ribbonthetavault, signer)
          console.log(
            '🚀 ~ file: useRibbon.ts ~ line 20 ~ loadContracts ~ c',
            c
          )
          setContract(c)
        } catch (err) {
          console.log(err)
        }
      }
    }
    loadContracts()
  }, [provider, vaultAddress])

  const readValue = async (
    value: string,
    formatter?: (wei: BigNumberish) => string
  ) => {
    if (typeof contract !== 'undefined') {
      try {
        let res = await contract[value]()
        if (formatter && typeof formatter === 'function') {
          res = formatter(res)
        }
        return res
      } catch (err) {
        console.log('Error: ', err)
      }
    } else {
      console.log('NO CONTRACT')
    }
  }

  const estimateGas = async (fn: string, args: {}) => {
    if (typeof contract !== 'undefined') {
      try {
        const gas = await contract.estimateGas[fn]({
          ...args,
        })
        return gas
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('NO CONTRACT')
    }
  }

  const depositETH = async (value: ethers.BigNumber) => {
    if (typeof contract !== 'undefined') {
      try {
        const gasPrice = await estimateGas('depositETH', {
          value,
        })
        const overrides = {
          gasLimit: ethers.BigNumber.from(200000),
          gasPrice,
          value,
        }
        const tx = await contract.depositETH(overrides)
        const receipt = await tx.wait()
        return receipt
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('NO CONTRACT')
    }
  }

  const depositErc20 = async (value: number, decimals: number) => {
    if (typeof contract !== 'undefined') {
      try {
        const amount = convertNumberToBigNumber(value, decimals)
        const gasPrice = await estimateGas('deposit', value)
        const overrides = {
          gasLimit: ethers.BigNumber.from(200000),
          gasPrice,
          // amount
        }
        //TODO estimate right amount, current overrides throwing rpc errors
        const tx = await contract.deposit(amount) //, overrides);
        const receipt = await tx.wait()
        return receipt
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('NO CONTRACT')
    }
  }

  const withdraw = async (value: number, decimals: number) => {
    if (typeof contract != 'undefined') {
      try {
        const amount = convertNumberToBigNumber(value, decimals)
        const shareAmount = await contract.assetAmountToShares(amount)
        const tx = await contract.withdraw(shareAmount)
        const receipt = await tx.wait()
        return receipt
      } catch (err) {
        console.log(err)
      }
    }
  }

  const approve = async (
    vaultAddress: string,
    tokenContract: ethers.Contract,
    balance: ethers.BigNumber
  ) => {
    if (typeof contract != 'undefined') {
      if (!balance || !tokenContract || !vaultAddress) {
        return
      }
      try {
        const tx = await tokenContract.approve(vaultAddress, balance)
        const receipt = await tx.wait()
        return receipt
      } catch (err) {
        console.log(err)
      }
    }
  }
  return {
    approve,
    contract,
    depositErc20,
    depositETH,
    estimateGas,
    readValue,
    withdraw,
  }
}

export default useRibbon
