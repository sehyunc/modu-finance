/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useEffect, useState } from "react";
import Erc20Abi from "../ERC20.json";
import { utils, ethers, BigNumberish } from "ethers";

type TokenTicker = "wbtc" | "usdc";

export default function useApproveToken(
  providerOrSigner: ethers.providers.Web3Provider,
  token: TokenTicker,
  test: boolean = false
) {
  const [contract, setContract] = useState<ethers.Contract>();
  const [decimals, setDecimals] = useState<number>(0);

  let _address: string | undefined;
  switch (token) {
    case "usdc":
      _address = test
        ? "0x7e6edA50d1c833bE936492BF42C1BF376239E9e2"
        : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      break;
    case "wbtc":
      _address = test
        ? "0x50570256f0da172a1908207aaf0c80d4b279f303"
        : "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
      break;
    default:
      break;
  }

  useEffect(() => {
    if (token === "usdc") {
      setDecimals(6);
    } else if (token === "wbtc") {
      setDecimals(8);
    }
  }, [token]);

  useEffect(() => {
    let active = true;

    async function loadContracts() {
      if (!providerOrSigner || !_address) return;
      const signer = providerOrSigner.getSigner();
      console.log(`loading contracts`);
      try {
        const _contract = new ethers.Contract(_address, Erc20Abi, signer);
        if (active) setContract(_contract);
      } catch (e) {
        console.log("ERROR LOADING CONTRACTS!!", e);
      }
    }
    loadContracts();

    return () => {
      active = false;
    };
  }, [_address, providerOrSigner]);

  const approve = async (
    accountAddress: string,
    amount: string,
    decimals: number
  ) => {
    // const value = ethers.BigNumber.from(amount);
    const value = utils.parseUnits(amount, decimals);
    if (typeof contract !== "undefined") {
      try {
        const tx = await contract.approve(accountAddress, value);
        const receipt = await tx.wait();
        return receipt;
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      console.log("NO CONTRACT");
    }
  };

  return { approve, contract, decimals };
}
