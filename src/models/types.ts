import { Platform } from 'models/Vault'

export interface RibbonVaultConstructor {
  id: string
  name: string
  underlyingSymbol: Symbol
  lockedAmount: string
  cap: string
  totalWithdrawalFee?: string
  withdrawalFee?: number
  depositors?: string[]
  decimals: number
  platform: Platform
  apy: number
  address?: string
  externalLink: string
  underlyingTokenAddress?: string
  yieldFromPremium?: string
  tokenArray?: string[]
  uuid: string
}
//TODO Remove all other vault constructor thingies
export interface FontisVaultConstructor {
  id: string
  collateralAmount: string
  otokenAmount: string
  vaultTotalAssets: string
  yieldFromPremium: string
  platform: Platform
  address?: string
  underlyingTokenAddress?: string
}

export interface StakeDAOVaultConstructor {
  id: string
  name: string
  apy: number
  amount: string
  shares: string
  vault: string
}
export type Symbol = 'WETH' | 'USDC' | 'WBTC'
