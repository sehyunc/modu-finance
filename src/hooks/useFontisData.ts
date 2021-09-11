import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "../../fontisClient";
import { Vault } from "models/Vault";
import { FontisVaultConstructor } from "models/types";
import { querySubgraph } from "utils/helpers";

export const useFontisData = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
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
        `;
      const response = await querySubgraph("https://api.thegraph.com/subgraphs/name/fontus-god/fontis", query);
      const { data } = await response.json()
      console.log("🚀 ~ fontisData ~ data", data);
      const newVaults: Vault[] = [];
      data.mintAndSells.forEach((vault: FontisVaultConstructor) => {
        const v = Vault.fromFontisSubgraph(vault);
        newVaults.push(v);
      });
      setVaults(newVaults);
      console.log("🚀 ~ fetchData ~ newVaults", newVaults);
    };
    fetchData();
  }, []);

  return vaults;
};
