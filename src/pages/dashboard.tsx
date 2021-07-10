import { Main } from "@/components/Main";
import { PageContainer } from "@/components/PageContainer";
import VaultCard from "@/components/VaultCard";
import { Button, Heading, HStack } from "@chakra-ui/react";
import useRibbon from "@/hooks/useRibbon";
import useFontis from "@/hooks/useFontis";
import useToken from "@/hooks/useToken";
import useOnboard from "@/hooks/useOnboard";
import { utils, ethers } from "ethers";

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
  const { depositETH, contract, readValue, estimateGas } = useFontis(provider);
  const { approve } = useToken(provider, "usdc");

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

  const deposit = async (amount: string) => {
    const tx = await depositETH(utils.parseEther(amount));
    console.log(`Transaction hash: ${tx.hash}`);
    console.log(`Transaction was mined in block ${tx.receipt.blockNumber}`);
  };

  return (
    <PageContainer>
      <Main maxWidth="49rem">
        <Button onClick={() => readValue("state")}>Fetch Value</Button>
        <Button
          onClick={() =>
            approve("0xa6f018bbed3300ed2b2f42c5b3013a9cbc984f90", 1)
          }
        >
          Approve 1 USDC
        </Button>
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
