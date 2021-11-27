import { Platform } from './Vault'
export const PlatformToDescriptionMap: {
  [key: string]: string
} = {
  Fontis: `Fontis finance enables users to earn a yield by depositing assets into perpetual vaults trading options strategies.

  Fontis creates products with a perpetual position out of instruments with expiries, enabling users to invest in long term strategies without active management.
  
  Vaults are capped in the total amount that can be deposited to make sure strategies are fulfilled and users can get the best yield.`,
  '0x8b5876f5b0bf64056a89aa7e97511644758c3e8c': `The vault earns yield on its WBTC deposits by running a weekly automated WBTC covered call strategy. The vault reinvests the yield earned back into the strategy, effectively compounding the yields for depositors over time.`,
  '0x0fabaf48bbf864a3947bdd0ba9d764791a60467a': `The vault earns yield on its ETH deposits by running a weekly automated ETH covered call strategy. The vault reinvests the yield earned back into the strategy, effectively compounding the yields for depositors over time.`,
  '0x16772a7f4a3ca291c21b8ace76f9332ddffbb5ef': `T-USDC-P-ETH earns yield on its USDC deposits by running a weekly automated ETH put-selling strategy, where the put options are collateralized by USDC. The vault reinvests the yield it earns back into the strategy, effectively compounding the yields for depositors over time.`,
  '0x8fe74471f198e426e96be65f40eed1f8ba96e54f': `T-YVUSDC-P-ETH earns yield on its USDC deposits by running a weekly automated ETH put-selling strategy, where the put options are collateralized by yvUSDC. The vault reinvests the yield it earns back into the strategy, effectively compounding the yields for depositors over time.`,
  StakeDAO: `
  This strategy leverages Opyn’s oTokens to sell 7-day European BTC call options every Friday to market makers via Airswap. The premium received generates passive income for its users. The position is covered with WBTC collateral representing 100% of the face value of the call options sold. The WBTC collateral is staked into Stake DAO’s passive BTC strategy to generate additional yield. The call options’ strike price is set using a consistent methodology every week, targeting a 10% Delta (which corresponds to a strike price generally around 25% above the current price).

No performance fee. 0.5% withdrawal fee.

For more information, take a look at this medium post.
  `,
}
