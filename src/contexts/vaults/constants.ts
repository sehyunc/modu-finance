export const BASE_URL = `https://api.thegraph.com/subgraphs/name/`
export const FONTIS_URL = `${BASE_URL}fontus-god/fontis`
export const RIBBON_URL = `${BASE_URL}kenchangh/ribbon-finance`
export const STAKEDAO_URL = `${BASE_URL}pumpkingwok/stakedao-opyn`
export const FONTIS_QUERY = `
query Vaults {
  mintAndSells(first: 1) {
    id
    timestamp
    collateralAmount
    otokenAmount
    yieldFromPremium
    vaultTotalAssets
  }
}
`
export const RIBBON_QUERY = `
query Vaults {
  vaults {
    id
    name
    symbol
    lockedAmount
    underlyingSymbol
    totalBalance
    cap
    totalWithdrawalFee
    depositors
  }
 vaultOptionTrades{
   timestamp
   premium
   vault {
     totalBalance
     underlyingName
     name
   }
 }
}
`

export const STAKEDAO_QUERY = `
query Vaults {
  options{
    id
    name
    vault
    amount
    shares
    maxCap
  }
  optWeeks{
    id
    earned
    lockedAmount
    apy
  }
}
`

export const APY_DATA: { [key: string]: number } = {
  'Ribbon ETH Theta Vault': 0.1701,
  'Ribbon USDC Theta Vault ETH Put': 0,
  'Ribbon BTC Theta Vault': 0.1683,
  'Ribbon yvUSDC Theta Vault ETH Put': 0.2906,
}
