import { Platform, VaultSymbol } from 'models/Vault'

export interface RibbonVaultConstructor {
  id: string
  name: string
  symbol: VaultSymbol
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
}

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
  symbol: Symbol
  underlyingSymbol: Symbol
  amount: string
  shares: string
  vault: string
  platform: Platform
}
export type Symbol = 'WETH' | 'USDC' | 'WBTC'
