/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useEffect, useState } from "react";
import RibbonTUSDCPAbi from "../RibbonTUSDCP.json";
import RibbonTWBTCCAbi from "../RibbonTWBTCC.json";
import { utils, ethers, BigNumberish } from "ethers";
import { getVaultAddress } from "@/utils/helpers";

export default function useRibbon(
  providerOrSigner: ethers.providers.Web3Provider
) {
  const [contract, setContract] = useState<ethers.Contract>();
  useEffect(() => {
    let active = true;

    async function loadContracts() {
      // const _address = getVaultAddress("ribbon", "T-WBTC-C", false); //check wallet network here
      const _address = "0x06ec862721C6A376B62D9718040e418ECedfDa1a";
      if (providerOrSigner && _address) {
        const signer = providerOrSigner.getSigner();
        console.log(`loading contracts`);
        try {
          const _contract = new ethers.Contract(
            _address,
            RibbonTWBTCCAbi,
            signer
          );
          if (active) setContract(_contract);
        } catch (e) {
          console.log("ERROR LOADING CONTRACTS!!", e);
        }
      }
    }
    loadContracts();

    return () => {
      active = false;
    };
  }, [providerOrSigner]);

  const readValue = async (
    value: string,
    formatter?: (wei: BigNumberish) => string
  ) => {
    if (typeof contract !== "undefined") {
      try {
        let res = await contract[value]();
        if (formatter && typeof formatter === "function") {
          res = formatter(res);
        }
        console.log(
          "🚀 ~ file: useRibbon.ts ~ line 42 ~ fetchValue ~ res",
          res
        );

        return res;
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      console.log("NO CONTRACT");
    }
  };

  const estimateGas = async (fn: string, args: {}) => {
    if (typeof contract !== "undefined") {
      try {
        const gas = await contract.estimateGas[fn]({
          ...args,
        });
        return gas;
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      console.log("NO CONTRACT");
    }
  };

  const depositETH = async (value: ethers.BigNumber) => {
    if (typeof contract !== "undefined") {
      try {
        const gasPrice = await estimateGas("depositETH", {
          value,
        });
        const overrides = {
          gasLimit: ethers.BigNumber.from(200000),
          gasPrice,
          value,
        };
        const tx = await contract.depositETH(overrides);
        const receipt = await tx.wait();
        return receipt;
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      console.log("NO CONTRACT");
    }
  };

  const depositErc20 = async (value: ethers.BigNumber) => {
    if (typeof contract !== "undefined") {
      try {
        const gasPrice = await estimateGas("deposit", value);
        const overrides = {
          gasLimit: ethers.BigNumber.from(200000),
          gasPrice,
          // value,
        };

        const tx = await contract.deposit(value, overrides);
        const receipt = await tx.wait();
        return receipt;
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      console.log("NO CONTRACT");
    }
  };
  return { estimateGas, contract, depositErc20, depositETH, readValue };
}
