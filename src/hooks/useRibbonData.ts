import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import ribbonClient from "../../ribbonClient";
import { Vault } from "models/Vault";
import { RibbonVaultConstructor } from "models/types";

const useRibbonData = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await ribbonClient.query({
        query: gql`
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
        `,
      });
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

export default useRibbonData;
