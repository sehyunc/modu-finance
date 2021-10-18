export type VaultOptionTrade = {
  timestamp: string
  premium: string
  vault: Vault
  yieldFromPremium?:string
}

export type Vault = {
    totalBalance : string
    underlyingBalance: string
    name: string
}