import React, { useCallback, useEffect, useReducer, useState } from "react"

import { FontisVaultConstructor, RibbonVaultConstructor } from "models/types"
import { Vault } from "models/Vault"

import { FONTIS_QUERY, FONTIS_URL, RIBBON_APY_QUERY, RIBBON_QUERY, RIBBON_URL } from "./constants"
import VaultsContext from "./VaultsContext"
import { ribbonAPYCalculation } from "utils/helpers"

const VaultsProvider: React.FC = ({ children }) => {
  const [ribbonVaults, setRibbonVaults] = useState<Vault[]>([])
  const [fontisVaults, setFontisVaults] = useState<Vault[]>([])
  const [allVaults, setAllVaults] = useState<Vault[]>([])

  const handleFetchFontisVaults = useCallback(async () => {
    const { data } = await fetch(FONTIS_URL, {
      body: JSON.stringify({
        query: FONTIS_QUERY,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())

    const newVaults: Vault[] = []
    data.mintAndSells.forEach((vault: FontisVaultConstructor) => {
      const v = Vault.fromFontisSubgraph(vault)
      newVaults.push(v)
    })
    setFontisVaults(newVaults)
  }, [])

  const handleFetchRibbonVaults = useCallback(async () => {
    const { data } = await fetch(RIBBON_URL, {
      body: JSON.stringify({
        query: RIBBON_QUERY,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())

    // We need to query APY data seperately
    let {data : apyData } = await fetch(RIBBON_URL, {
      body: JSON.stringify({
        query: RIBBON_APY_QUERY
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    

    apyData = ribbonAPYCalculation(apyData)
    const newVaults: Vault[] = []
    data.vaults.forEach((vault: RibbonVaultConstructor) => {
      const v = Vault.fromRibbonSubgraph({ ...vault, platform: "ribbon", yieldFromPremium: apyData[vault.name] })
      console.log("vaultttt", v)
      newVaults.push(v)
    })
    setRibbonVaults(newVaults)
  }, [])

  useEffect(() => {
    setAllVaults([...fontisVaults, ...ribbonVaults])
  }, [fontisVaults, ribbonVaults])

  useEffect(() => {
    handleFetchFontisVaults()
  }, [handleFetchFontisVaults])

  useEffect(() => {
    handleFetchRibbonVaults()
  }, [handleFetchRibbonVaults])

  return (
    <VaultsContext.Provider
      value={{
        vaults: allVaults,
        fontisVaults,
        ribbonVaults,
      }}
    >
      {children}
    </VaultsContext.Provider>
  )
}

export default VaultsProvider
