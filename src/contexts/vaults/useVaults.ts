import { useContext } from "react";

import VaultsContext from "./VaultsContext";

const useWallet = () => {
  const vaults = useContext(VaultsContext);
  return vaults;
};

export default useWallet;
