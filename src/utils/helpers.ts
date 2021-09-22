import {
  KOVAN_OPYNBTC_ADDRESS,
  KOVAN_PETHC,
  KOVAN_TETHC,
  KOVAN_TUSDCP,
  KOVAN_TWBTC,
  KOVAN_WETH_ADDRESS,
} from "constants/addresses";

export const symbolToAddressMap: {
  [symbol: string]: string;
} = {
  WETH: KOVAN_WETH_ADDRESS,
  WBTC: KOVAN_OPYNBTC_ADDRESS,
};

export const symbolToDecimalMap: { [symbol: string]: number } = {
  WETH: 18,
  WBTC: 8,
  USDC: 6,
};

export const vaultNameToAddressMap: {
  [platform: string]: { [vaultName: string]: string };
} = {
  ribbon: {
    "T-WBTC-C": KOVAN_TWBTC,
    "T-ETH-C": KOVAN_TETHC,
    "T-USDC-P": KOVAN_TUSDCP,
  },
  fontis: {
    "P-ETH-C": KOVAN_PETHC,
  },
};

export const roundOffBigInt = (num: bigint, decimals: number) => {
  var numString = num.toString();
  console.log("numString : ", numString.length);
  if (decimals > numString.length) {
    while (numString.length <= decimals) numString = "0" + numString;
  }

  const decimalPoint = numString.length - decimals;
  console.log(decimals, decimalPoint);
  numString =
    numString.slice(0, decimalPoint) +
    "." +
    numString.slice(decimalPoint, numString.length);
  return numString.slice(0, decimalPoint + 4);
};

export const convertNumberToBigInt = (value: number, decimals: number) => {
  var stringValue = String(value);
  if (!stringValue.includes(".")) {
    for (var i = 0; i < decimals; i++) stringValue = stringValue + "0";
    return BigInt(stringValue);
  } else {
    const decimalPoint = stringValue.indexOf(".");
    var postDecimal = stringValue.slice(decimalPoint + 1, stringValue.length);
    if (postDecimal.length < decimals) {
      while (postDecimal.length < decimals) postDecimal = postDecimal + "0";
    } else {
      //discard extra digits
      postDecimal = postDecimal.slice(0, decimals);
    }
    return BigInt(stringValue.slice(0, decimalPoint) + postDecimal);
  }
};
