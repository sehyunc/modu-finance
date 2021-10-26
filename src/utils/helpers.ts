import { BigNumber } from '@ethersproject/bignumber'

import {
  KOVAN_OPYNBTC_ADDRESS,
  KOVAN_OPYNUSDC_ADDRESS,
  KOVAN_PETHC,
  KOVAN_TETHC,
  KOVAN_TUSDCP,
  KOVAN_TWBTC,
  KOVAN_WETH_ADDRESS,
} from 'constants/addresses'
import { SD_Option, SD_OptWeek, VaultOptionTrade } from './types'

import { VaultSymbol } from 'models/Vault'

export const symbolToAddressMap: {
  [symbol: string]: string
} = {
  WETH: KOVAN_WETH_ADDRESS,
  WBTC: KOVAN_OPYNBTC_ADDRESS,
  USDC: KOVAN_OPYNUSDC_ADDRESS,
}

export const symbolToDecimalMap: { [symbol: string]: number } = {
  WETH: 18,
  WBTC: 8,
  USDC: 6,
}

export const vaultSymbolToAddressMap: {
  [platform: string]: { [vaultName in VaultSymbol]?: string }
} = {
  ribbon: {
    'rBTC-THETA': KOVAN_TWBTC,
    'rETH-THETA': KOVAN_TETHC,
    'rUSDC-ETH-P-THETA': KOVAN_TUSDCP,
    'ryvUSDC-ETH-P-THETA': KOVAN_TUSDCP,
  },
  fontis: {
    'fETH-PERP': KOVAN_PETHC,
  },
  stakedao: {
    stakeTest: KOVAN_WETH_ADDRESS,
  },
}

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

export const ribbonAPYCalculation = (
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

export const stakedaoDataPrep = (data: any) => {
  const { options, optWeeks } = data

  const options_with_ids: { [id: string]: SD_Option } = {}

  options.forEach((option: SD_Option) => {
    options_with_ids[option.id] = option
  })

  const usefulOptWeeks: { [id: string]: SD_OptWeek } = {}
  optWeeks.forEach((optWeek: SD_OptWeek) => {
    if (
      !usefulOptWeeks[optWeek.id[0]] ||
      (usefulOptWeeks[optWeek.id[0]].id.split('-').slice(-1) <
        optWeek.id.split('-').slice(-1) &&
        optWeek.apy != null)
    ) {
      usefulOptWeeks[optWeek.id[0]] = optWeek
    }
  })

  const results: SD_OptWeek[] = []

  Object(usefulOptWeeks).keys((key: string) => {
    results.push(usefulOptWeeks[key])
  })

  return results
}
