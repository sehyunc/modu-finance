/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useEffect, useState } from "react";
import RibbonABI from "../RibbonCoveredCall.json";

const { ethers } = require("ethers");

export default function useRibbon(providerOrSigner) {
  const [contract, setContract] = useState();
  useEffect(() => {
    let active = true;

    async function loadContracts() {
      if (providerOrSigner && typeof providerOrSigner !== "undefined") {
        const signer = providerOrSigner.getSigner();
        console.log(`loading contracts`);
        try {
          const _address = "0x5B8E6eaB6502CC642d00A55F0d8B5f5557c94Bc5";
          const _contract = new ethers.Contract(_address, RibbonABI, signer);
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

  const readValue = async (value, formatter) => {
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

  return { contract, readValue };
}
