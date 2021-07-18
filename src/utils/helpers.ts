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
            return "0x5B8E6eaB6502CC642d00A55F0d8B5f5557c94Bc5";
          case "T-WBTC-C":
            return "0x06ec862721C6A376B62D9718040e418ECedfDa1a";
          case "T-USDC-P-ETH":
            return "0xA7A9F92765Cab4e0d4Db0622210bc4cBC95DbF4d";
          default:
            return;
        }
      case "fontis":
        switch (vault) {
          case "PerpVault":
            return "0x21Ed852c14e1858C5d3F7afD9f3bBE714269Dc31";
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
          return "0xb9a143a9b010ff7F4408Ee87AE42C401c7c9De6D";
        case "T-WBTC-C":
          return "0x8b5876f5B0Bf64056A89Aa7e97511644758c3E8c";
        case "T-USDC-P-ETH":
          return "0x8FE74471F198E426e96bE65f40EeD1F8BA96e54f";
        default:
          return;
      }
    case "fontis":
      switch (vault) {
        case "PerpVault":
          return "0x76200Bff5bD2c2a007380aa596742AA863863557";
        default:
          return;
      }
    default:
      return;
  }
};
