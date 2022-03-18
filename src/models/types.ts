import { Platform } from 'models/Vault'

export interface RibbonVaultConstructor {
  lockedAmount: string
  address?: string
  apy: number
  cap?: string
  depositors?: string[]
  decimals: number
  description: string
  externalLink: string
  id: string
  name: string
  platform: Platform
  totalBalance: string
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
  maxCap: string
  shares: string
  vault: string
}
export type Symbol = 'WETH' | 'USDC' | 'WBTC'
