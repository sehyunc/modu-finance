/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { ethers } from "ethers";
import { API, Wallet } from "bnc-onboard/dist/src/interfaces";
import Onboard from "bnc-onboard";
import { getNetworkNameAliasByChainId, getChainIdByAlias } from "utils/network";

import { SELECTED_WALLET_COOKIE_KEY } from "hooks/constants";
import { useCookieOptions } from "./useCookieOptions";
import erc20abi from "../constants/abi/erc20.json"

export const onboardAtom = atom<API>(undefined as API);
export const addressAtom = atom<string>(undefined as string);
export const networkAtom = atom<number>(undefined as number);
export const networkNameAtom = atom<string>((get) =>
  getNetworkNameAliasByChainId(get(networkAtom))
);
export const providerAtom = atom<ethers.providers.Web3Provider>(
  undefined as ethers.providers.Web3Provider
);
export const balanceAtom = atom<string>(undefined as string);
export const walletAtom = atom<Wallet>(undefined as Wallet);

const useInitializeOnboard = (
  config: {
    defaultNetworkName: string;
  } = { defaultNetworkName: "kovan" }
) => {
  const [onboard, setOnboard] = useAtom(onboardAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [network, setNetwork] = useAtom(networkAtom);
  const [provider, setProvider] = useAtom(providerAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [wallet, setWallet] = useAtom(walletAtom);

  const cookieOptions = useCookieOptions();

  // Initialize Onboard

  const getOnboard = async (): Promise<API> => {
    const prov = new ethers.getDefaultProvider("wss://kovan.infura.io/ws/v3/6462ee1e07a545188f9d444247d3a9e1")
    console.log("prov :", prov)
    console.log((await prov.getBalance("0xE4FD02153f1ECfb5730Dae24B24c66Ca27d404C5")).toString())

    const WBTC = new ethers.Contract("0x50570256f0da172a1908207aaf0c80d4b279f303", erc20abi, prov)
    console.log((await WBTC.balanceOf("0xE4FD02153f1ECfb5730Dae24B24c66Ca27d404C5")).toString())
    
    return initOnboard(
      {
        address: setAddress,
        network: setNetwork,
        balance: setBalance,
        wallet: (wallet) => {
          if (wallet.provider) {
            setWallet(wallet);
            setProvider(
              new ethers.providers.Web3Provider(wallet.provider, "any")
            );
            Cookies.set(SELECTED_WALLET_COOKIE_KEY, wallet.name, cookieOptions);
            console.log("Curr provider", provider)
          } else {
            setWallet(undefined);
            setProvider(undefined);
            Cookies.remove(SELECTED_WALLET_COOKIE_KEY, cookieOptions);
          }
        },
      },
      config
    );
  };

  const handleLoadOnboard = async () => {
    const onboard = await getOnboard();
    setOnboard(onboard);
  };

  useEffect(() => {
    handleLoadOnboard();
  }, []);

  // Internal Functions

  const setSelectedWallet = useCallback(
    (selectedWallet) => {
      try {
        onboard.walletSelect(selectedWallet);
      } catch (e) {
        console.warn("Onboard isn't ready!");
      }
    },
    [onboard]
  );

  const disconnectWallet = useCallback(() => {
    try {
      onboard.walletReset();
      Cookies.remove(SELECTED_WALLET_COOKIE_KEY, cookieOptions);
    } catch (e) {
      console.warn("Onboard isn't ready!");
    }
  }, [onboard, cookieOptions]);

  // Hooks

  // Auto sign in
  useEffect(() => {
    const previouslySelectedWallet = Cookies.get(SELECTED_WALLET_COOKIE_KEY);
    if (onboard && Boolean(previouslySelectedWallet)) {
      disconnectWallet();
      setSelectedWallet(previouslySelectedWallet);
    }
  }, [onboard]);
};

export default useInitializeOnboard;

const initOnboard = (subscriptions, walletConfig) => {
  const onboard = Onboard;
  const { defaultNetworkName } = walletConfig;

  const defaultNetworkId = getChainIdByAlias(defaultNetworkName);

  return onboard({
    hideBranding: true,
    networkId: defaultNetworkId,
    darkMode: true,
    subscriptions,
  });
};
