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
  public apy: number
  public cap: string
  public decimals: number
  public depositors?: string[]
  public externalLink: string
  public id: string
  public lockedAmount: string
  public name: string
  public platform: Platform
  public symbol: VaultSymbol
  public totalWithdrawalFee?: string
  public underlyingSymbol: Symbol

  constructor(options: RibbonVaultConstructor) {
    this.apy = options.apy
    this.cap = options.cap
    this.decimals = symbolToDecimalMap[options.underlyingSymbol]
    this.depositors = options.depositors
    this.externalLink = options.externalLink
    this.id = options.id
    this.lockedAmount = options.lockedAmount
    this.name = options.name
    this.platform = options.platform
    this.symbol = options.symbol
    this.totalWithdrawalFee = options.totalWithdrawalFee
    this.underlyingSymbol = options.underlyingSymbol
  }

  public static fromRibbonSubgraph(options: RibbonVaultConstructor): Vault {
    return new Vault({
      apy: Math.pow(1 + Number(options.yieldFromPremium), 52) - 1,
      cap: options.cap,
      decimals: symbolToDecimalMap[options.underlyingSymbol],
      depositors: options.depositors,
      externalLink: 'https://app.ribbon.finance/',
      id: options.id,
      lockedAmount: options.lockedAmount,
      name: options.name,
      platform: options.platform,
      symbol: options.symbol,
      totalWithdrawalFee: options.totalWithdrawalFee,
      underlyingSymbol: options.underlyingSymbol,
    })
  }

  public static fromFontisSubgraph(options: FontisVaultConstructor): Vault {
    return new Vault({
      apy: Math.pow(1 + Number(options.yieldFromPremium), 52) - 1,
      decimals: symbolToDecimalMap['WETH'],
      cap: '1000000000000000000000',
      externalLink: 'https://fontis.finance/vaults/thetagang',
      id: options.id,
      lockedAmount: options.collateralAmount,
      name: 'Fontis ETH Perpetual Vault',
      platform: 'fontis',
      symbol: 'fETH-PERP',
      underlyingSymbol: 'WETH',
      withdrawalFee: 0.04,
    })
  }
}
