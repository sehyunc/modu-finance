import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "../../fontisClient";
import { Vault } from "models/Vault";
import { FontisVaultConstructor } from "models/types";

const useFontisClient = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: gql`
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
        `,
      });
      console.log("🚀 ~ fetchData ~ data", data);
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

export default useFontisClient;
