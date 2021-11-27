import { utils } from 'ethers'
import { symbolToDecimalMap } from 'utils/helpers'
import {
  FontisVaultConstructor,
  RibbonVaultConstructor,
  StakeDAOVaultConstructor,
  Symbol,
} from './types'

// export type Platform = 'ribbon' | 'fontis' | 'stakedao'
export enum Platform {
  RIBBON = 'Ribbon',
  FONTIS = 'Fontis',
  STAKEDAO = 'StakeDAO',
}

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
  public tokenArray?: string[]
  
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
    this.tokenArray = options?.tokenArray
  }

  public static fromRibbonSubgraph(options: RibbonVaultConstructor): Vault {
    const strategy = this.isCall(options.name) ? 'Covered Call' : 'Put'
    const formattedName = `${options.underlyingSymbol} ${strategy} Strategy`
    return new Vault({
      apy: Math.pow(1 + Number(options.yieldFromPremium), 52) - 1,
      cap: options.cap,
      decimals: symbolToDecimalMap[options.underlyingSymbol],
      depositors: options.depositors,
      externalLink: 'https://app.ribbon.finance/',
      id: options.id,
      lockedAmount: options.lockedAmount,
      name: formattedName,
      platform: Platform.RIBBON,
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
      name: 'ETH Perpetual Strategy',
      platform: Platform.FONTIS,
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

    const underlyingSymbol = wrappedUnderlyingMap[underlyingFromName] as Symbol
    const strategy = this.isCall(options.name) ? 'Covered Call' : 'Put'
    const formattedName = `${underlyingSymbol} ${strategy} Strategy`
    const uuid = this.createUUID('stakedao', options.vault)
    const tokenArray = this.chooseTokenArray(uuid)

    return new Vault({
      apy: options.apy,
      cap: utils.parseUnits('1', 18).toString(),
      decimals: symbolToDecimalMap[underlyingSymbol],
      externalLink: 'https://stakedao.org/ox/options',
      id: options.id,
      lockedAmount: options.amount,
      name: formattedName,
      platform: Platform.STAKEDAO,
      underlyingSymbol,
      uuid: uuid,
      tokenArray: tokenArray
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

  public static isCall = (name: string) => {
    return name.toLowerCase().indexOf('put') === -1
  }

  public static chooseTokenArray = (uuid: string) => {
    const ETH_PUT_tokens = ['FRAX', 'DAI', 'USDC', 'USDT', 'FRAX3CRV-f']
    const BTC_CALL_tokens = ['WBTC', 'crvRenWSBTC']
    console.log("uuid", uuid)
    switch (uuid) {
      case 'stakedao_0x839a989be40f2d60f00beeb648903732c041cbd7':
        return ETH_PUT_tokens
      case 'stakedao_0x227e4635c5fe22d1e36dab1c921b62f8acc451b9':
        return BTC_CALL_tokens
      case 'stakedao_0x9b8f14554f40705de7908879e2228d2ac94fde1a':
        return ['ETH']
    }
  }
}
