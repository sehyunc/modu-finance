import { useContext } from "react";

import VaultsContext from "./VaultsContext";

const useWallet = () => {
  const wallet = useContext(VaultsContext);
  return wallet;
};

export default useWallet;
