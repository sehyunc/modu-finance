import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "../../apollo-client";
import { Vault } from "@/models/Vault";

const useRibbonData = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
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
      data.vaults.forEach((vault) => {
        const v = Vault.fromGraph(vault);
        newVaults.push(v);
      });
      setVaults(newVaults);
    };
    fetchData();
  }, []);

  return vaults;
};

export default useRibbonData;
