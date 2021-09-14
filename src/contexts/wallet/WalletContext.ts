import { createContext } from "react";

import { ethers } from "ethers";

export interface WalletContextValues {
  account: string;
  provider?: ethers.providers.Provider;
  onConnect: () => void;
  onConnectToMetaMask: () => Promise<ethers.providers.Web3Provider | undefined>;
}

const WalletContext = createContext<WalletContextValues>({
  account: "",
  onConnect: () => new Promise(() => {}).then(() => undefined),
  onConnectToMetaMask: () => new Promise(() => {}).then(() => undefined),
});

export default WalletContext;
