import { BigNumber } from '@ethersproject/bignumber'

import {
  ETH__DAI,
  ETH__OPYNBTC_ADDRESS,
  ETH__OPYNUSDC_ADDRESS,
  ETH__PETHC,
  ETH__TETHC,
  ETH__TUSDCP,
  ETH__TWBTC,
  ETH__WETH_ADDRESS,
} from 'constants/addresses'
import { VaultOptionTrade } from './types'

export const symbolToAddressMap: {
  [symbol: string]: string
} = {
  WETH: ETH__WETH_ADDRESS,
  WBTC: ETH__OPYNBTC_ADDRESS,
  USDC: ETH__OPYNUSDC_ADDRESS,
  DAI: ETH__DAI,
}

export const symbolToDecimalMap: { [symbol: string]: number } = {
  WETH: 18,
  WBTC: 8,
  USDC: 6,
}

// TESTNET ADDRESSES
export const uuidToAddressMap: { [uuid: string]: string } = {
  fontis_0x20e05f8b445c5c9ad8eabab7d4d32e0d3c8f09a0fd772d82003b3f7e8b96ed1f:
    ETH__PETHC,
  ribbon_0x0fabaf48bbf864a3947bdd0ba9d764791a60467a: ETH__TETHC,
  ribbon_0x16772a7f4a3ca291c21b8ace76f9332ddffbb5ef: ETH__TUSDCP,
  ribbon_0x8b5876f5b0bf64056a89aa7e97511644758c3e8c: ETH__TWBTC,
  ribbon_0x8fe74471f198e426e96be65f40eed1f8ba96e54f: ETH__TUSDCP,
  stakedao_0x9b8f14554f40705de7908879e2228d2ac94fde1a: ETH__WETH_ADDRESS,
  stakedao_0x227e4635c5fe22d1e36dab1c921b62f8acc451b9: ETH__WETH_ADDRESS,
  stakedao_0x839a989be40f2d60f00beeb648903732c041cbd7: ETH__WETH_ADDRESS,
}

// LEGACY IF IT BREAKS ON TESTNET
// export const vaultSymbolToAddressMap: {
//   [platform: string]: { [vaultName in VaultSymbol]?: string }
// } = {
//   ribbon: {
//     'rBTC-THETA': ETH__TWBTC,
//     'rETH-THETA': ETH__TETHC,
//     'rUSDC-ETH-P-THETA': ETH__TUSDCP,
//     'ryvUSDC-ETH-P-THETA': ETH__TUSDCP,
//   },
//   fontis: {
//     'fETH-PERP': ETH__PETHC,
//   },
//   stakedao: {
//     stakeTest: ETH__WETH_ADDRESS,
//   },
// }

export const roundOffBigNumber = (num: BigNumber, decimals: number) => {
  if (!(num && decimals)) {
    return '0'
  }
  var numString = num.toString()
  if (decimals > numString.length) {
    while (numString.length <= decimals) numString = '0' + numString
  }

  const decimalPoint = numString.length - decimals
  numString =
    numString.slice(0, decimalPoint) +
    '.' +
    numString.slice(decimalPoint, numString.length)
  return numString.slice(0, decimalPoint + 4)
}

export const convertNumberToBigNumber = (value: number, decimals: number) => {
  var stringValue = String(value)
  if (!stringValue.includes('.')) {
    for (var i = 0; i < decimals; i++) stringValue = stringValue + '0'
    return BigNumber.from(stringValue)
  } else {
    const decimalPoint = stringValue.indexOf('.')
    var postDecimal = stringValue.slice(decimalPoint + 1, stringValue.length)
    if (postDecimal.length < decimals) {
      while (postDecimal.length < decimals) postDecimal = postDecimal + '0'
    } else {
      //discard extra digits
      postDecimal = postDecimal.slice(0, decimals)
    }
    return BigNumber.from(stringValue.slice(0, decimalPoint) + postDecimal)
  }
}

export const getRibbonApy = (
  apyData: VaultOptionTrade[]
): { [id: string]: string } => {
  const cleanData: { [id: string]: VaultOptionTrade[] } = {}
  var sortedData: { [id: string]: VaultOptionTrade[] } = {}
  var results: { [id: string]: string } = {}

  apyData.forEach((query) => {
    if (!cleanData[query.vault.name]) {
      cleanData[query.vault.name] = []
    }
    cleanData[query.vault.name].push({
      timestamp: query.timestamp,
      premium: query.premium,
      //@ts-ignore
      yieldFromPremium: query.premium / query.vault.totalBalance,
    })
  })

  Object.keys(cleanData).forEach((key) => {
    var sortedArray = cleanData[key].sort(function (
      a: VaultOptionTrade,
      b: VaultOptionTrade
    ) {
      return Number(a.timestamp) - Number(b.timestamp)
    })
    sortedData[key] = sortedArray.reverse()
  })
  Object.keys(sortedData).forEach((key) => {
    results[key] = sortedData[key][0]['yieldFromPremium']!
  })

  return results
}
