import {
  ETH_ADDRESS, WETH_ADDRESS} from './constants';
import hre from "hardhat"
import { ethers} from 'hardhat'
import WETH_ABI from './abi/weth.json';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';

export async function wrapEth(from: any, to: string, amount: any) {
  from = await ethers.provider.getSigner(from);
  const weth = new ethers.Contract(WETH_ADDRESS, WETH_ABI, from);
  let overrides = {
    value: amount
  };
  await weth.deposit(overrides);
  await weth.transfer(to, amount);
  const bal = ethers.utils.formatEther((await weth.balanceOf(to)).toString());
}

export async function approveErc20(signer: any, erc20Address: any, to: any, amount: any) {
  signer = await ethers.provider.getSigner(signer);
  const erc20 = new ethers.Contract(erc20Address, ERC20.abi, signer);
  await erc20.approve(to, amount);
}

export async function transferErc20(erc20Address: any, signer: any, to: any, amount: any) {
  signer = await ethers.provider.getSigner(signer);
  const erc20 = new ethers.Contract(erc20Address, ERC20.abi, signer);
  await erc20.transfer(to, amount);
}

export async function getErc20Contract(signer: any, erc20Address: any) {
  signer = await ethers.provider.getSigner(signer);
  return new ethers.Contract(erc20Address, ERC20.abi, signer);
}

export async function balanceOf(erc20Address: any, walletAddress: string) {
  const signer = (await ethers.getSigners())[0];
  if (erc20Address == ETH_ADDRESS ) {
    return await ethers.provider.getBalance(walletAddress);
  } else {
    const erc20 = new ethers.Contract(erc20Address, ERC20.abi, signer);
    return await erc20.balanceOf(walletAddress);
  }
}

export async function impersonateTransferFrom(
  erc20Address: string,
  from: string,
  to: string,
  amount: any
) {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [from]}
  )

  if (erc20Address == ETH_ADDRESS) {
    const signer = await ethers.provider.getSigner(from);
    const tx = await signer.sendTransaction({
      to: to,
      value: amount
    });
    await tx.wait()
  } else {
    await transferErc20(erc20Address, from, to, amount);
  }

  await hre.network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [from]}
  )
}

export const executeTradeAndCheckBalances = async (
  tokenOut: string, account: string, trade: () => any
): Promise<{balanceBefore: string, balanceAfter: string}> => {
  const balanceBefore = (await balanceOf(tokenOut, account)).toString();

  const tx = await trade();
  console.log("Gas used: ", tx.gasPrice.toString())

  let balanceAfter = await balanceOf(tokenOut, account);
  balanceAfter = ethers.utils.formatUnits(balanceAfter.toString(), 'mwei');

  return {balanceBefore, balanceAfter}
}
