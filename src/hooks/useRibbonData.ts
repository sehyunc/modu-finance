import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import ribbonClient from "../../ribbonClient";
import { Vault } from "models/Vault";
import { RibbonVaultConstructor } from "models/types";
import { querySubgraph } from "utils/helpers";

export const useRibbonData = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
          query Vaults {
            vaults {
              id
              name
              symbol
              underlyingSymbol
              lockedAmount
              cap
              totalWithdrawalFee
              depositors
            }
          }
        `;

      const response = await querySubgraph("https://api.thegraph.com/subgraphs/name/kenchangh/ribbon-finance", query);
      const {data}  = await response.json()
      console.log("Data :", data)
      const newVaults: Vault[] = [];
      data.vaults.forEach((vault: RibbonVaultConstructor) => {
        const v = Vault.fromRibbonSubgraph({ ...vault, platform: "ribbon" });
        newVaults.push(v);
      });
      setVaults(newVaults);
    };
    fetchData();
  }, []);

  return vaults;
};
