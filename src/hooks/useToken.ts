import { useEffect, useCallback, useState, useMemo } from "react";
import erc20abi from "constants/abi/erc20.json";
import { utils, ethers } from "ethers";
import useOnboard from "@/hooks/useOnboard";

export default function useApproveToken(
  proxyContractAddress: string | undefined,
  token: "wbtc" | "usdc",
  test: boolean = false
) {
  const { provider } = useOnboard();
  const [decimals, setDecimals] = useState<number>(0);
  const [gasLimit, setGasLimit] = useState<number>();

  let tokenAddress: string = "";
  switch (token) {
    case "usdc":
      tokenAddress = test
        ? "0x7e6edA50d1c833bE936492BF42C1BF376239E9e2"
        : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      break;
    case "wbtc":
      tokenAddress = test
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

  let tokenContract: ethers.Contract | undefined = undefined;
  if (provider && tokenAddress) {
    tokenContract = new ethers.Contract(
      tokenAddress,
      erc20abi,
      provider.getSigner()
    );
  }

  const fetchGasLimit = useCallback(async () => {
    if (!provider || !proxyContractAddress || !tokenAddress) {
      return;
    }
    try {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        erc20abi,
        provider.getSigner()
      );
      const limit = await tokenContract.estimateGas.approve(
        proxyContractAddress,
        1
      );
      setGasLimit(Math.round(limit.toNumber() * 1.5));
    } catch (e) {}
  }, [provider, proxyContractAddress, setGasLimit, tokenAddress]);

  useEffect(() => {
    fetchGasLimit();
  }, [fetchGasLimit]);

  const handleApprove = useCallback(async () => {
    if (!provider || !proxyContractAddress || !tokenAddress || !tokenContract) {
      return;
    }
    const txHash = await tokenContract
      .approve(proxyContractAddress, ethers.constants.MaxUint256, {
        gasLimit,
        gasPrice: utils.parseUnits("20", "gwei"),
      })
      .then((tx) => {
        return tx.hash;
      })
      .catch((e) => console.error("error during token approval", e));
    return txHash;
  }, [gasLimit, provider, proxyContractAddress, tokenAddress, tokenContract]);

  return { gasLimit, decimals, onApprove: handleApprove };
}
