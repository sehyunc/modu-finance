import {
  FontisVaultConstructor,
  RibbonVaultConstructor,
  StakeDAOVaultConstructor,
  Symbol,
} from './types'
import { symbolToDecimalMap } from 'utils/helpers'
import { utils } from 'ethers'

export type Platform = 'ribbon' | 'fontis' | 'stakedao'
export type VaultSymbol =
  | 'rBTC-THETA'
  | 'rETH-THETA'
  | 'rUSDC-ETH-P-THETA'
  | 'ryvUSDC-ETH-P-THETA'
  | 'fETH-PERP'
  | 'stakeTest'
// remove symbols

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
  public uuid: string
  public underlyingSymbol: Symbol
  public totalWithdrawalFee?: string

  constructor(options: RibbonVaultConstructor) {
    this.apy = options.apy
    this.cap = options.cap
    this.decimals = symbolToDecimalMap[options.underlyingSymbol]
    this.externalLink = options.externalLink
    this.id = options.id
    this.lockedAmount = options.lockedAmount
    this.name = options.name
    this.platform = options.platform
    this.underlyingSymbol = options.underlyingSymbol
    this.uuid = options.uuid
  }

  public static fromRibbonSubgraph(options: RibbonVaultConstructor): Vault {
    const formattedName = options.name.split(' ').slice(1).join(' ')
    return new Vault({
      apy: Math.pow(1 + Number(options.yieldFromPremium), 52) - 1,
      cap: options.cap,
      decimals: symbolToDecimalMap[options.underlyingSymbol],
      depositors: options.depositors,
      externalLink: 'https://app.ribbon.finance/',
      id: options.id,
      lockedAmount: options.lockedAmount,
      name: formattedName,
      platform: 'ribbon',
      totalWithdrawalFee: options.totalWithdrawalFee,
      underlyingSymbol: options.underlyingSymbol,
      uuid: this.createUUID('ribbon', options.id),
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
      name: 'ETH Perpetual Vault',
      platform: 'fontis',
      underlyingSymbol: 'WETH',
      withdrawalFee: 0.04,
      uuid: this.createUUID('fontis', options.id),
    })
  }

  public static fromStakeDAOSubgraph(options: StakeDAOVaultConstructor): Vault {
    const underlyingFromName = options.name.split(' ')[0]
    const wrappedUnderlyingMap: { [token: string]: string } = {
      ETH: 'WETH',
      BTC: 'WBTC',
    }
    const underlying = wrappedUnderlyingMap[underlyingFromName] as Symbol

    return new Vault({
      apy: options.apy,
      cap: utils.parseUnits('1', 18).toString(),
      decimals: 0,
      externalLink: 'https://stakedao.org/ox/options',
      id: options.id,
      lockedAmount: options.amount,
      name: options.name,
      platform: 'stakedao',
      underlyingSymbol: underlying,
      uuid: this.createUUID('stakedao', options.vault),
    })
  }

  public static createUUID = (platform: string, vaultAddress: string) => {
    return `${platform}_${vaultAddress.toLowerCase()}`
  }

  public static getAddressFromUuid = (uuid: string) => {
    return uuid.split('_')[1]
  }
  public static getPlatformFromUuid = (uuid: string) => {
    return uuid.split('_')[0]
  }
}
