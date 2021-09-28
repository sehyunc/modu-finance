import { FontisVaultConstructor, RibbonVaultConstructor, Symbol } from './types'
import { symbolToDecimalMap } from 'utils/helpers'

export type Platform = 'ribbon' | 'fontis'
export type VaultSymbol =
  | 'rBTC-THETA'
  | 'rETH-THETA'
  | 'rUSDC-ETH-P-THETA'
  | 'ryvUSDC-ETH-P-THETA'
  | 'fETH-PERP'

export class Vault {
  public id: string
  public name: string
  public symbol: VaultSymbol
  public underlyingSymbol: Symbol
  public lockedAmount: string
  public cap: string
  public totalWithdrawalFee?: string
  public depositors?: string[]
  public decimals: number
  public platform: Platform
  public apy: number

  constructor(options: RibbonVaultConstructor) {
    this.id = options.id
    this.name = options.name
    this.symbol = options.symbol
    this.underlyingSymbol = options.underlyingSymbol
    this.lockedAmount = options.lockedAmount
    this.cap = options.cap
    this.totalWithdrawalFee = options.totalWithdrawalFee
    this.depositors = options.depositors
    this.decimals = symbolToDecimalMap[options.underlyingSymbol]
    this.platform = options.platform
    this.apy = options.apy
  }

  public static fromRibbonSubgraph(options: RibbonVaultConstructor): Vault {
    return new Vault({
      id: options.id,
      name: options.name,
      symbol: options.symbol,
      underlyingSymbol: options.underlyingSymbol,
      lockedAmount: options.lockedAmount,
      cap: options.cap,
      totalWithdrawalFee: options.totalWithdrawalFee,
      depositors: options.depositors,
      decimals: symbolToDecimalMap[options.underlyingSymbol],
      platform: options.platform,
      apy: 0,
    })
  }

  public static fromFontisSubgraph(options: FontisVaultConstructor): Vault {
    return new Vault({
      id: options.id,
      name: 'Fontis ETH Perpetual Vault',
      symbol: 'fETH-PERP',
      underlyingSymbol: 'WETH',
      lockedAmount: options.collateralAmount,
      cap: '1000000000000000000000',
      withdrawalFee: 0.04,
      decimals: symbolToDecimalMap['WETH'],
      platform: 'fontis',
      apy: Math.pow(1 + Number(options.yieldFromPremium), 52) - 1,
    })
  }
}
