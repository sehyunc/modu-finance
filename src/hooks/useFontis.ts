/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useEffect, useState } from 'react'
import fontisabi from 'constants/abi/fontisperpetualvault.json'
import { utils, ethers, BigNumberish } from 'ethers'
import useWallet from 'contexts/wallet/useWallet'

export function useFontis(vaultAddress: string) {
  const [contract, setContract] = useState<ethers.Contract>()
  const { provider } = useWallet()

  useEffect(() => {
    let active = true

    async function loadContracts() {
      if (!provider || !vaultAddress) return
      const signer = provider.getSigner()
      try {
        const _contract = new ethers.Contract(vaultAddress, fontisabi, signer)
        if (active) setContract(_contract)
      } catch (e) {
        console.log('ERROR LOADING CONTRACTS!!', e)
      }
    }
    loadContracts()

    return () => {
      active = false
    }
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
        console.log('🚀 ~ res', res)

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
        console.log('Error: ', err)
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
        console.log('Error: ', err)
      }
    } else {
      console.log('NO CONTRACT')
    }
  }

  return { estimateGas, contract, depositETH, readValue }
}
