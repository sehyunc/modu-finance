import { ethers, network } from 'hardhat'
import { BigNumber, Signer } from 'ethers'
import { approveErc20, balanceOf, impersonateTransferFrom, transferErc20 } from '../utils/testUtils'
import { ETH_ADDRESS, UNI_ADDRESS, USDC_ADDRESS, USDC_WHALE, WBTC_ADDRESSS, WBTC_WHALE } from '../utils/constants'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import SDETHCALL_ABI from '../utils/abi/stakeDAO_eth_call.json'
import SDETHPUT_ABI from '../utils/abi/stakeDAO_eth_put.json'
import SDWBTCCALL_ABI from '../utils/abi/stakeDAO_wbtc_call.json'
import { valueScaleCorrection } from 'framer-motion/types/render/dom/projection/scale-correction'
import { Code } from '@chakra-ui/layout'
import { expect } from 'chai'

describe('stakedao', async function () {
  let accounts: Signer[]
  let signer: SignerWithAddress;
  beforeEach(async function () {
    signer = (await ethers.getSigners())[0]
  })

  it('ETH CALL', async function () {
    this.timeout(10000000)

    // await impersonateTransferFrom(ETH_ADDRESS, WHA, signer.address, BigNumber.from("99999999"))
    
    const sdEthCall = new ethers.Contract(
      '0x9b8f14554f40705de7908879e2228d2ac94fde1a',
      SDETHCALL_ABI,
      signer
    )
    const ethBalance = "0.1"; 
    const ethBalanceBefore = (await signer.getBalance()).toString();
    const sdEthCallResponse = await sdEthCall.depositETH("100",{
      value : ethers.utils.parseEther(ethBalance)
    })
    // console.log(sdEthCallResponse)

    console.log("poolShares :",(await sdEthCall.balanceOf(signer.address)).toString())
    const signerVaultBalance = await sdEthCall.balanceOf(signer.address)
    const signerTokenBalance =   await balanceOf(
          '0x9b8f14554f40705de7908879e2228d2ac94fde1a',
          signer.address
        )
      
    expect(signerTokenBalance === signerVaultBalance)

    const resp = await sdEthCall.withdrawETH(signerVaultBalance, "1");
    const ethBalanceAfter = (await signer.getBalance()).toString();
    expect(ethBalanceAfter === ethBalanceBefore)

  })

    it('WBTC Call', async function () {
      this.timeout(10000000)

      // await impersonateTransferFrom(ETH_ADDRESS, WHA, signer.address, BigNumber.from("99999999"))
      const vaultAddress = '0x227e4635c5fe22D1e36daB1C921B62f8ACC451b9';
      const vaultContract = new ethers.Contract(vaultAddress, SDWBTCCALL_ABI, signer)
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

      const response = await vaultContract.depositUnderlying(
        '10000000',
        1
      )
      console.log("gasUsed:",response.gasUsed)

      console.log("poolShares : ",(await vaultContract.balanceOf(signer.address)).toString())
      const signerVaultBalance = await vaultContract.balanceOf(signer.address)
      const signerTokenBalance = await balanceOf(
        vaultAddress,
        signer.address
      )

      expect(signerTokenBalance === signerVaultBalance)

      const resp = await vaultContract.withdrawUnderlying(
        signerVaultBalance,
        '1'
      )
      const wbtcBalanceAfter = (
        await balanceOf(WBTC_ADDRESSS, signer.address)
      ).toString()

      expect(wbtcBalanceAfter === wbtcBalanceBefore)
    })

    it('ETH Put', async function () {
      this.timeout(10000000)

      // await impersonateTransferFrom(ETH_ADDRESS, WHA, signer.address, BigNumber.from("99999999"))
      const vaultAddress = '0x839A989bE40f2D60f00beEB648903732c041CBd7'
      const vaultContract = new ethers.Contract(
        vaultAddress,
        SDETHPUT_ABI,
        signer
      )
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

      const response = await vaultContract.depositUnderlying('1000000000', 1, 2)
      // console.log(response)

      console.log("poolShares : ",(await vaultContract.balanceOf(signer.address)).toString())
      const signerVaultBalance = await vaultContract.balanceOf(signer.address)
      const signerTokenBalance = await balanceOf(
        vaultAddress,
        signer.address
      )

      expect(signerTokenBalance === signerVaultBalance)

      const resp = await vaultContract.withdrawUnderlying(signerVaultBalance, '1')
      const usdcBalanceAfter = (
        await balanceOf(USDC_ADDRESS, signer.address)
      ).toString()

      expect(usdcBalanceAfter === usdcBalanceBefore)
    })
  })

