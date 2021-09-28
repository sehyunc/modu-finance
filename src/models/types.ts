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
  underlyingTokenAddress?: string
  externalLink: string
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

export type Symbol = 'WETH' | 'USDC' | 'WBTC'
