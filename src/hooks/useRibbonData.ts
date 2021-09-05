import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "../../apollo-client";

const useRibbonData = () => {
  const [vaults, setVaults] = useState({});

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
      setVaults(data.vaults);
    };
    fetchData();
  }, []);

  return vaults;
};

export default useRibbonData;
