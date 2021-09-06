import {KOVAN_FONTIS_PERP_VAULT, KOVAN_TWBTC_ADDRESS, KOVAN_TUSDCP_ETH_ADDRESS, KOVAN_TETHC_ADDRESS, TETHC_ADDRESS, TWBTC_ADDRESS, TUSDCP_ETH_ADDRESS, FONTIS_PERP_VAULT} from '../constants/constants'

export const getVaultAddress = (
  platform: string,
  vault: string,
  test: boolean = true
): string | undefined => {
  if (test) {
    switch (platform) {
      case "ribbon":
        switch (vault) {
          case "T-ETH-C":
            return KOVAN_TETHC_ADDRESS;
          case "T-WBTC-C":
            return KOVAN_TWBTC_ADDRESS;
          case "T-USDC-P-ETH":
            return KOVAN_TUSDCP_ETH_ADDRESS;
          default:
            return;
        }
      case "fontis":
        switch (vault) {
          case "PerpVault":
            return KOVAN_FONTIS_PERP_VAULT;
          default:
            return;
        }
      default:
        return;
    }
  }

  switch (platform) {
    case "ribbon":
      switch (vault) {
        case "T-ETH-C":
          return TETHC_ADDRESS;
        case "T-WBTC-C":
          return TWBTC_ADDRESS;
        case "T-USDC-P-ETH":
          return TUSDCP_ETH_ADDRESS;
        default:
          return;
      }
    case "fontis":
      switch (vault) {
        case "PerpVault":
          return FONTIS_PERP_VAULT;
        default:
          return;
      }
    default:
      return;
  }
};

export const roundOffBigInt = (num : bigint, decimals : number) => {
  
  var numString = num.toString()
  console.log("numString : ", numString.length)
  if(decimals> numString.length){
    while(numString.length <= decimals) numString = "0" + numString 
  }

  const decimalPoint = numString.length - decimals
  console.log(decimals, decimalPoint)
  numString = numString.slice(0, decimalPoint) + "." + numString.slice(decimalPoint, numString.length)
  return numString.slice(0,decimalPoint+4)
}

export const convertNumberToBigInt = (value : number, decimals :number) => {
  var stringValue = String(value)
  if(!stringValue.includes(".")){
    for(var i =0;i<decimals;i++) stringValue = stringValue + "0"
    return BigInt(stringValue)
  } else {
    const decimalPoint = stringValue.indexOf(".")
    var postDecimal = stringValue.slice(decimalPoint+1, stringValue.length)
    if(postDecimal.length < decimals){
      while(postDecimal.length < decimals) postDecimal = postDecimal + "0"
    } else {
      //discard extra digits
      postDecimal = postDecimal.slice(0, decimals)
    }
    return BigInt(stringValue.slice(0, decimalPoint) + postDecimal)
  }
}