import React, { useCallback, useEffect, useState } from 'react'

import { RibbonVaultConstructor, StakeDAOVaultConstructor } from 'models/types'
import { Vault } from 'models/Vault'

import {
  RIBBON_QUERY,
  RIBBON_URL,
  STAKEDAO_QUERY,
  STAKEDAO_URL,
  APY_DATA,
} from './constants'
import VaultsContext from './VaultsContext'
import { getRibbonApy } from 'utils/helpers'

const stakeDaoIdToApyMap: { [id: string]: string } = {
  '0': 'eth',
  '1': 'btc',
  '2': 'fraxRetail',
}

const VaultsProvider: React.FC = ({ children }) => {
  const [allVaults, setAllVaults] = useState<Vault[]>([])
  const [ribbonVaults, setRibbonVaults] = useState<Vault[]>([])
  const [stakedaoVaults, setStakeDAOVaults] = useState<Vault[]>([])

  const handleFetchRibbonVaults = useCallback(async () => {
    const { data } = await fetch('https://api.thegraph.com/subgraphs/name/ribbon-finance/ribbon-v2', {
      body: JSON.stringify({
        query: RIBBON_QUERY,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    console.log("🚀 ~ file: VaultsProvider.tsx ~ line 37 ~ handleFetchRibbonVaults ~ data", data)

    
    const apyData = getRibbonApy(data.vaultOptionTrades)
    const newVaults: Vault[] = []
    data.vaults.forEach((vault: RibbonVaultConstructor) => {
      
      console.log("🚀 ~ file: VaultsProvider.tsx ~ line 47 ~ data.vaults.forEach ~ vault.name", vault.name)
      const v = Vault.fromRibbonSubgraph({
        ...vault,
        yieldFromPremium: apyData[vault.name]?.toString(),
      })
      newVaults.push(v)
    })
    setRibbonVaults(newVaults)
  }, [])

  const handleFetchStakeDAOVaults = useCallback(async () => {
    const { data } = await fetch(STAKEDAO_URL, {
      body: JSON.stringify({
        query: STAKEDAO_QUERY,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    const apy = await fetch('https://stakedao.org/api/options-history').then(
      (res) => res.json()
    )

    const newVaults: Vault[] = []
    data.options.forEach((vault: StakeDAOVaultConstructor) => {
      const v = Vault.fromStakeDAOSubgraph({
        ...vault,
        apy: Number(apy[stakeDaoIdToApyMap[vault.id]].APY) / 100,
      })
      newVaults.push(v)
    })
    setStakeDAOVaults(newVaults)
  }, [])

  const handleIdToVault = useCallback(
    (vaultIds: string[]) => {
      const vaults: Vault[] = []
      vaultIds.forEach((id) => {
        const v = allVaults.find((e) => e.id === id)
        if (!v) return
        vaults.push(v)
      })
      return vaults
    },
    [allVaults]
  )

  useEffect(() => {
    setAllVaults([...ribbonVaults, ...stakedaoVaults])
  }, [, ribbonVaults, stakedaoVaults])

  // useEffect(() => {
  //   handleFetchFontisVaults()
  // }, [handleFetchFontisVaults])

  useEffect(() => {
    handleFetchRibbonVaults()
  }, [handleFetchRibbonVaults])

  useEffect(() => {
    handleFetchStakeDAOVaults()
  }, [handleFetchStakeDAOVaults])

  return (
    <VaultsContext.Provider
      value={{
        ribbonVaults,
        stakedaoVaults,
        onIdToVault: handleIdToVault,
        vaults: allVaults,
      }}
    >
      {children}
    </VaultsContext.Provider>
  )
}

export default VaultsProvider
