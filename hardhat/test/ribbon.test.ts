import { ethers, network } from 'hardhat'
import { BigNumber, Signer } from 'ethers'
import {
  approveErc20,
  balanceOf,
  impersonateTransferFrom,
} from '../utils/testUtils'
import {
  USDC_ADDRESS,
  USDC_WHALE,
  WBTC_ADDRESSS,
  WBTC_WHALE,
} from '../utils/constants'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import RIBBON_ABI from '../utils/abi/ribbonthetavault.json'
import { expect } from 'chai'
import { EtherscanProvider } from '@ethersproject/providers'

describe('ribbon fi', async function () {
  let accounts: Signer[]
  let signer: SignerWithAddress
  beforeEach(async function () {
    signer = (await ethers.getSigners())[0]
  })

  it('T-ETH-c', async function () {
    this.timeout(10000000)

    // await impersonateTransferFrom(ETH_ADDRESS, WHA, signer.address, BigNumber.from("99999999"))

    const vaultContract = new ethers.Contract(
      '0x0FABaF48Bbf864a3947bdd0Ba9d764791a60467A',
      RIBBON_ABI,
      signer
    )
    const ethBalance = '0.1'
    const ethBalanceBefore = (await signer.getBalance()).toString()
    const sdEthCallResponse = await vaultContract.depositETH({
      value: ethers.utils.parseEther('0.1'),
    })
    // console.log(sdEthCallResponse)

    console.log(
      'poolShares : ',
      (await vaultContract.balanceOf(signer.address)).toString()
    )
    const signerVaultBalance = await vaultContract.balanceOf(signer.address)
    const signerTokenBalance = await balanceOf(
      '0x0FABaF48Bbf864a3947bdd0Ba9d764791a60467A',
      signer.address
    )

    expect(signerTokenBalance === signerVaultBalance)

    const resp = await vaultContract.withdrawETH(signerVaultBalance)
    const ethBalanceAfter = (await signer.getBalance()).toString()
    expect(ethBalanceAfter === ethBalanceBefore)
  })

  it('WBTC Call', async function () {
    this.timeout(10000000)

    // await impersonateTransferFrom(ETH_ADDRESS, WHA, signer.address, BigNumber.from("99999999"))
    const vaultAddress = '0x8b5876f5B0Bf64056A89Aa7e97511644758c3E8c'
    const vaultContract = new ethers.Contract(vaultAddress, RIBBON_ABI, signer)
    await impersonateTransferFrom(
      WBTC_ADDRESSS,
      WBTC_WHALE,
      signer.address,
      BigNumber.from('10000000')
    )

    const wbtcBalanceBefore = (await signer.getBalance()).toString()
    await approveErc20(
      signer.address,
      WBTC_ADDRESSS,
      vaultAddress,
      BigNumber.from('10000000')
    )

    const response = await vaultContract.deposit('10000000')
    // console.log(response)

    console.log("poolShares : ",(await vaultContract.balanceOf(signer.address)).toString())
    const signerVaultBalance = await vaultContract.balanceOf(signer.address)
    const signerTokenBalance = await balanceOf(vaultAddress, signer.address)

    expect(signerTokenBalance === signerVaultBalance)

    const resp = await vaultContract.withdraw(signerVaultBalance)
    const wbtcBalanceAfter = (
      await balanceOf(WBTC_ADDRESSS, signer.address)
    ).toString()

    expect(wbtcBalanceAfter === wbtcBalanceBefore)
  })

  it('T-yvUSDC-P-ETH', async function () {
    this.timeout(10000000)

    // await impersonateTransferFrom(ETH_ADDRESS, WHA, signer.address, BigNumber.from("99999999"))
    const vaultAddress = '0x8FE74471F198E426e96bE65f40EeD1F8BA96e54f'
    const vaultContract = new ethers.Contract(vaultAddress, RIBBON_ABI, signer)
    await impersonateTransferFrom(
      USDC_ADDRESS,
      USDC_WHALE,
      signer.address,
      BigNumber.from('1000000000')
    )

    const usdcBalanceBefore = (await signer.getBalance()).toString()
    await approveErc20(
      signer.address,
      USDC_ADDRESS,
      vaultAddress,
      BigNumber.from('1000000000')
    )

    const response = await vaultContract.deposit('1000000000')
    // console.log(response)

    console.log("poolShares : ",(await vaultContract.balanceOf(signer.address)).toString())
    const signerVaultBalance = await vaultContract.balanceOf(signer.address)
    const signerTokenBalance = await balanceOf(vaultAddress, signer.address)

    expect(signerTokenBalance === signerVaultBalance)

    const resp = await vaultContract.withdraw(signerVaultBalance)
    const usdcBalanceAfter = (
      await balanceOf(USDC_ADDRESS, signer.address)
    ).toString()

    expect(usdcBalanceAfter === usdcBalanceBefore)
  })
  it('T-USDC-P-ETH', async function () {
    this.timeout(10000000)

    // await impersonateTransferFrom(ETH_ADDRESS, WHA, signer.address, BigNumber.from("99999999"))
    const vaultAddress = '0x16772a7f4a3ca291C21B8AcE76F9332dDFfbb5Ef'
    const vaultContract = new ethers.Contract(vaultAddress, RIBBON_ABI, signer)
    await impersonateTransferFrom(
      USDC_ADDRESS,
      USDC_WHALE,
      signer.address,
      BigNumber.from('1000000000')
    )

    const usdcBalanceBefore = (await signer.getBalance()).toString()
    await approveErc20(
      signer.address,
      USDC_ADDRESS,
      vaultAddress,
      BigNumber.from('1000000000')
    )

    const response = await vaultContract.deposit('1000000000')
    // console.log(response)

    console.log("poolShares : ",(await vaultContract.balanceOf(signer.address)).toString())
    const signerVaultBalance = await vaultContract.balanceOf(signer.address)
    const signerTokenBalance = await balanceOf(vaultAddress, signer.address)

    expect(signerTokenBalance === signerVaultBalance)

    const resp = await vaultContract.withdraw(signerVaultBalance)
    const usdcBalanceAfter = (
      await balanceOf(USDC_ADDRESS, signer.address)
    ).toString()

    expect(usdcBalanceAfter === usdcBalanceBefore)
  })})
