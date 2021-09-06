import { Main } from "components/Main";
import { PageContainer } from "components/PageContainer";
import VaultCard from "components/VaultCard";
import { Button, Heading, HStack } from "@chakra-ui/react";
import {useRibbon, useApprove, useOnboard, useRibbonData} from "hooks/index";
import { utils } from "ethers";

const CURRENT_VAULTS = [
  {
    name: "T-ETH-C",
    platform: "Ribbon",
    underlying: "ETH",
    apy: "9.23",
    current: "9999.99",
    max: "10000",
  },
  {
    name: "T-BTC-C",
    platform: "Ribbon",
    underlying: "WBTC",
    apy: "2.31",
    current: "12",
    max: "120",
  },
  // {
  //   name: "Theta-Gang",
  //   platform: "Fontis",
  //   underlying: "ETH",
  //   apy: "6.78",
  //   current: "22",
  //   max: "1000",
  // },
  // {
  //   name: "Theta-Gang",
  //   platform: "Fontis",
  //   underlying: "ETH",
  //   apy: "6.78",
  //   current: "22",
  //   max: "1000",
  // },
];

const WATCH_VAULTS = [
  {
    name: "Theta-Gang",
    platform: "Fontis",
    underlying: "ETH",
    apy: "6.78",
    current: "22",
    max: "1000",
  },
  {
    name: "Theta-Gang",
    platform: "Fontis",
    underlying: "ETH",
    apy: "6.78",
    current: "22",
    max: "1000",
  },
];

const Dashboard = () => {
  const { provider } = useOnboard();
  const { address, depositErc20, readValue } = useRibbon();
  const { onApprove, decimals } = useApprove(address, "usdc", true);
  const vaults = useRibbonData();
  console.log("🚀 ~ Dashboard ~ vaults", vaults);

  async function fetchBalance() {
    if (typeof provider !== "undefined") {
      try {
        let balance = await provider.getBalance(
          "0xa6F018BBed3300Ed2b2F42c5b3013a9cbC984F90"
        );
        balance = utils.formatEther(balance);
        console.log(balance);
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      console.log("No Provider");
    }
  }

  // const deposit = async (amount: string) => {
  //   const tx = await depositETH(utils.parseEther(amount));
  //   console.log(`Transaction hash: ${tx.hash}`);
  //   console.log(`Transaction was mined in block ${tx.receipt.blockNumber}`);
  // };

  const deposit = async (amount: string, decimals: number) => {
    const amt = utils.parseUnits(amount, decimals);
    const tx = await depositErc20(amt);
    console.log(`Transaction hash: ${tx?.hash}`);
    console.log(`Transaction was mined in block ${tx?.receipt.blockNumber}`);
  };

  return (
    <PageContainer>
      <Main maxWidth="49rem">
        <Button
          onClick={() =>
            readValue("totalBalance", (value) =>
              utils.formatUnits(value, decimals)
            )
          }
        >
          Fetch Value
        </Button>
        <Button onClick={() => onApprove()}>Approve 10 USDC</Button>
        <Button onClick={() => deposit("0.1", 8)}>Deposit</Button>
        <Heading>My Vaults</Heading>
        <HStack align="center" spacing="12">
          {CURRENT_VAULTS.map(
            ({ name, platform, underlying, apy, current, max }, index) => (
              <VaultCard
                key={index}
                name={name}
                platform={platform}
                underlying={underlying}
                apy={apy}
                current={current}
                max={max}
              />
            )
          )}
        </HStack>
        <Heading>Watchlist</Heading>
        <HStack align="center" spacing="12">
          {WATCH_VAULTS.map(
            ({ name, platform, underlying, apy, current, max }, index) => (
              <VaultCard
                key={index}
                name={name}
                platform={platform}
                underlying={underlying}
                apy={apy}
                current={current}
                max={max}
              />
            )
          )}
        </HStack>
      </Main>
    </PageContainer>
  );
};

export default Dashboard;
