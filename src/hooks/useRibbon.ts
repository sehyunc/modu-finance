import ribbonthetavault from "@/constants/abi/ribbonthetavault.json";
import { getVaultAddress } from "@/utils/helpers";
import { BigNumberish, ethers } from "ethers";
import { useEffect, useState } from "react";
import useGas from "@/hooks/useGas";
import useOnboard from "@/hooks/useOnboard";

// TODO: make vault model type with all necessary fields and pass that around for token, address, etc.

export default function useRibbon() {
  const { provider } = useOnboard();
  const [contract, setContract] = useState<ethers.Contract>();
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    let active = true;

    async function loadContracts() {
      const _address = getVaultAddress("ribbon", "T-USDC-P-ETH"); //check wallet network here
      // const _address = "0x06ec862721C6A376B62D9718040e418ECedfDa1a";
      console.log("dashboard address :",_address)
      if (provider && _address) {
        const signer = provider.getSigner();

        console.log(`loading contracts`, signer);
        try {
          const _contract = new ethers.Contract(
            _address,
            ribbonthetavault,
            signer
          );
          if (active) {
            setContract(_contract);
            setAddress(_address);
          }
        } catch (e) {
          console.log("ERROR LOADING CONTRACTS!!", e);
        }
      }
    }
    loadContracts();

    return () => {
      active = false;
    };
  }, [provider]);

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
  return {
    address,
    estimateGas,
    contract,
    depositErc20,
    depositETH,
    readValue,
  };
}
