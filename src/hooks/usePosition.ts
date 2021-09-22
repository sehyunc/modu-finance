import { useCallback, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

import erc20Abi from "constants/abi/erc20.json";

import useWallet from "contexts/wallet/useWallet";

const usePosition = (address: string | undefined, isNative?: boolean) => {
  const [position, setPosition] = useState<BigNumber>();
  const { account, provider } = useWallet();

  const fetchPosition = useCallback(async () => {
    if (!account || !address || !provider) {
      return;
    }

    let position: BigNumber | undefined = undefined;
    if (isNative) {
      position = await provider.getBalance(account);
    } else {
      const vaultContract = new ethers.Contract(address, erc20Abi, provider);
      position = await vaultContract.balanceOf(account);
    }
    setPosition(position);
  }, [account, address, isNative, provider]);

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  useEffect(() => {
    setPosition(undefined);
  }, [account, address, setPosition]);

  useEffect(() => {
    const interval = setInterval(fetchPosition, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchPosition]);

  return position;
};

export default usePosition;
