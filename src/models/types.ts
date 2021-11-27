import { Platform } from 'models/Vault'

export interface RibbonVaultConstructor {
  address?: string
  apy: number
  cap?: string
  depositors?: string[]
  decimals: number
  description: string
  externalLink: string
  id: string
  lockedAmount: string
  name: string
  platform: Platform
  totalWithdrawalFee?: string
  underlyingSymbol: Symbol
  underlyingTokenAddress?: string
  uuid: string
  withdrawalFee?: number
  yieldFromPremium?: string
}

export interface FontisVaultConstructor {
  address?: string
  collateralAmount: string
  id: string
  otokenAmount: string
  platform: Platform
  underlyingTokenAddress?: string
  vaultTotalAssets: string
  yieldFromPremium: string
}

export interface StakeDAOVaultConstructor {
  amount: string
  apy: number
  id: string
  name: string
  shares: string
  vault: string
}
export type Symbol = 'WETH' | 'USDC' | 'WBTC'
