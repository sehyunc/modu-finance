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

  let _address: string | undefined;
  switch (token) {
    case "usdc":
      _address = test
        ? "0x75b0622cec14130172eae9cf166b92e5c112faff"
        : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      break;
    case "wbtc":
      _address = test
        ? "0xd3A691C852CDB01E281545A27064741F0B7f6825"
        : "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
      break;
    default:
      break;
  }

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

  return { approve, contract };
}
