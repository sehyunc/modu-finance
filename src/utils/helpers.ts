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

export const vaultNameToAddressMap: {
  [platform: string]: { [vaultName: string]: string }
} = {
  ribbon: {
    'rBTC-THETA': KOVAN_TWBTC,
    'rETH-THETA': KOVAN_TETHC,
    'rUSDC-ETH-P-THETA': KOVAN_TUSDCP,
    'ryvUSDC-ETH-P-THETA': KOVAN_TUSDCP,
  },
  fontis: {
    'fWETH-PERP': KOVAN_PETHC,
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
