import { useCallback, useEffect, useState } from 'react'
import { BigNumberish, ethers, Signer } from 'ethers'

import ethcall from 'constants/abi/stakeDAO_eth_call.json'
import ethput from 'constants/abi/stakeDAO_eth_put.json'

import ribbonthetavault from 'constants/abi/ribbonthetavault.json'
import stakeDAO_eth_call from 'constants/abi/stakeDAO_eth_call.json'
import stakeDAO_eth_put from 'constants/abi/stakeDAO_eth_put.json'
import stakeDAO_btc_call from 'constants/abi/stakeDAO_btc_call.json'

import useWallet from 'contexts/wallet/useWallet'

import { convertNumberToBigNumber } from 'utils/helpers'

export const useStakeDAO = (vaultAddress: string) => {
  const [contract, setContract] = useState<ethers.Contract>()
  const { provider } = useWallet()

  const handleLoadContract = useCallback(async () => {
    if (!provider || !vaultAddress) return
    const signer = provider.getSigner()
    try {
      const contract = new ethers.Contract(vaultAddress, ethcall, signer)
      setContract(contract)
    } catch (err) {
      console.log(err)
    }
  }, [provider, vaultAddress])

  useEffect(() => {
    handleLoadContract()
  }, [handleLoadContract, provider, vaultAddress])

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

  const depositETH = async (
    contract: ethers.Contract,
    value: ethers.BigNumber
  ) => {
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

  const depositErc20 = async (
    value: number,
    decimals: number,
    signer?: Signer,
    uuid?: string,
    tokenIndex?: number
  ) => {
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
        let tx
        let contract: ethers.Contract
        switch (uuid) {
          case 'stakedao_0x839a989be40f2d60f00beeb648903732c041cbd7':
            contract = new ethers.Contract(
              uuid.split('_')[1],
              stakeDAO_eth_put,
              signer
            )
            switch (tokenIndex) {
              case 0:
              case 1:
              case 2:
              case 3:
                //TODO setting minCrvLP amount here as 1
                console.log(
                  'contract.depositUnderlying' +
                    'stakedao_0x839a989be40f2d60f00beeb648903732c041cbd7'
                )
                tx = await contract.depositUnderlying(amount, 1, tokenIndex)
                break
              case 4:
                console.log(
                  'contract.depositCrvLP' +
                    'stakedao_0x839a989be40f2d60f00beeb648903732c041cbd7'
                )
                tx = await contract.depositCrvLP(amount)
            }
            break
          case 'stakedao_0x227e4635c5fe22d1e36dab1c921b62f8acc451b9':
            contract = new ethers.Contract(
              uuid.split('_')[1],
              stakeDAO_btc_call,
              signer
            )
            switch (tokenIndex) {
              case 0:
                //TODO setting minCrvLP amount here as 1
                console.log(
                  'contract.depositUnderlying' +
                    'stakedao_0x227e4635c5fe22d1e36dab1c921b62f8acc451b9'
                )
                tx = await contract.depositUnderlying(amount, 1)
                break
              case 1:
                console.log(
                  'contract.depositCrvLP' +
                    'stakedao_0x227e4635c5fe22d1e36dab1c921b62f8acc451b9'
                )
                tx = await contract.depositCrvLP(amount)
            }

            break

          case 'stakedao_0x9b8f14554f40705de7908879e2228d2ac94fde1a':
            contract = new ethers.Contract(
              uuid.split('_')[1],
              stakeDAO_eth_call,
              signer
            )
            console.log(
              'depositETH' +
                'stakedao_0x9b8f14554f40705de7908879e2228d2ac94fde1a'
            )
            depositETH(contract, amount)
            break

          default:
            tx = await contract!.deposit(amount) //, overrides);
        }
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
    approveSD: approve,
    contractSD: contract,
    depositErc20SD: depositErc20,
    depositETHSD: depositETH,
    estimateGasSD: estimateGas,
    readValueSD: readValue,
    withdrawSD: withdraw,
  }
}
