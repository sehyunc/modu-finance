export type VaultOptionTrade = {
  timestamp: string
  premium: string
  vault: Vault
  yieldFromPremium?: string
}

export type Vault = {
  totalBalance: string
  underlyingBalance: string
  name: string
}

export type SD_OptWeek = {
  id: string
  earned: string
  lockedAmount: string
  apy: string
}

export type SD_Option = {
  id: string
  name: string
  vault: string
  amount: string
  shares: string
}
