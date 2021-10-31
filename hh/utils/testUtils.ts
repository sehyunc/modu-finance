import {
  ETH_ADDRESS, WETH_ADDRESS, MATIC__MATIC_ADDRESS, MATIC__WMATIC_ADDRESS, ARBITRUM__WETH_ADDRESS, ARBITRUM__ETH_ADDRESS
} from './constants';
import hre from 'hardhat';
import WETH_ABI from './abi/weth.json';
import WMATIC_ABI from './abi/wmatic.json';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';
const {ethers, deployments} = hre;

async function uniswapTradeData (
  amount: any,
  path: string[],
  tradeAll: boolean,
  moduleName: string = 'UniswapModule'
) {
  const signer = (await ethers.getSigners())[0];

  const uniswapDeployed = await deployments.get(moduleName);
  const uniswapModule = new ethers.Contract(uniswapDeployed.address, uniswapDeployed.abi, signer);

  const uniswapTrade = uniswapModule.interface.encodeFunctionData('swap', [
    amount,
    path,
    tradeAll
  ])

  return {
    moduleAddress: uniswapModule.address,
    encodedCalldata: uniswapTrade
  }
}

export async function generateUniswapTradeData(
  amount: any,
  path: string[],
  tradeAll: boolean
) {
  return uniswapTradeData(amount, path, tradeAll)
}

export async function generateSushiSwapArbTradeData(
  amount: any,
  path: string[],
  tradeAll: boolean
) {
  return uniswapTradeData(amount, path, tradeAll, 'SushiSwapModuleArbitrum')
}
export async function generateSushiSwapTradeData(
  amount: any,
  path: string[],
  tradeAll: boolean
) {
  return uniswapTradeData(amount, path, tradeAll, 'SushiSwapModule')
}
export async function generateZeroSwapTradeData(
  amount: any,
  path: string[],
  tradeAll: boolean
) {
  return uniswapTradeData(amount, path, tradeAll, 'ZeroSwapModule')
}

export async function generateSushiSwapMaticTradeData(
  amount: any,
  path: string[],
  tradeAll: boolean
) {
  return uniswapTradeData(amount, path, tradeAll, 'SushiSwapModuleMatic')
}

export async function generateQuickSwapTradeData(
  amount: any,
  path: string[],
  tradeAll: boolean
) {
  return uniswapTradeData(amount, path, tradeAll, 'QuickSwapModuleMatic')
}

export async function generateBalancerTradeData(
  pool: string,
  tokenIn: string,
  tokenOut: string,
  totalAmountIn: any,
  tradeAll: boolean,
) {
  const signer = (await ethers.getSigners())[0];

  const balancerDeployed = await deployments.get('BalancerModule');
  const balancerModule = new ethers.Contract(balancerDeployed.address, balancerDeployed.abi, signer);

  const balancerTrade = balancerModule.interface.encodeFunctionData('swap', [
    pool,
    tokenIn,
    tokenOut,
    totalAmountIn,
    tradeAll
  ])

  return {
    moduleAddress: balancerModule.address,
    encodedCalldata: balancerTrade
  }
}

export async function generateCurveTradeData(
  curvePool: string,
  iToken: string,
  jToken: string,
  i: any,
  j: any,
  dx: any,
  tradeAll: boolean,
  underlyingTokens: boolean
) {
  const signer = (await ethers.getSigners())[0];

  const curveDeployed = await deployments.get('CurveModule');
  const curveModule = new ethers.Contract(curveDeployed.address, curveDeployed.abi, signer);

  const curveTrade = curveModule.interface.encodeFunctionData('swap', [
    curvePool,
    iToken,
    jToken,
    i,
    j,
    dx,
    tradeAll,
    underlyingTokens
  ])

  return {
    moduleAddress: curveModule.address,
    encodedCalldata: curveTrade
  }
}


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

export async function wrapMatic(from: any, to: string, amount: any) {
  from = await ethers.provider.getSigner(from);
  const wmatic = new ethers.Contract(MATIC__WMATIC_ADDRESS, WMATIC_ABI, from);
  let overrides = {
    value: amount
  };
  await wmatic.deposit(overrides);
  await wmatic.transfer(to, amount);
}

export async function wrapEthArbitrum(from: any, to: string, amount: any) {
  from = await ethers.provider.getSigner(from);
  const weth = new ethers.Contract(ARBITRUM__WETH_ADDRESS, WETH_ABI, from);
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
  if (erc20Address == ETH_ADDRESS || erc20Address == MATIC__MATIC_ADDRESS || erc20Address == ARBITRUM__ETH_ADDRESS) {
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

  if (erc20Address == ETH_ADDRESS || erc20Address == MATIC__MATIC_ADDRESS || erc20Address == ARBITRUM__ETH_ADDRESS) {
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
