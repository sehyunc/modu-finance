export const BASE_URL = `https://api.thegraph.com/subgraphs/name/`
export const FONTIS_URL = `${BASE_URL}fontus-god/fontis`
export const RIBBON_URL = `${BASE_URL}kenchangh/ribbon-finance`

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
    underlyingSymbol
    lockedAmount
    cap
    depositors
  }
}
`
