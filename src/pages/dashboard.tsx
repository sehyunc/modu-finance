import { Main } from "@/components/Main";
import { PageContainer } from "@/components/PageContainer";
import VaultCard from "@/components/VaultCard";
import { Button, Heading, HStack } from "@chakra-ui/react";
import useRibbon from "@/hooks/useRibbon";
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
  const { contract, readValue } = useRibbon(provider);

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

  const deposit = async () => {
    if (typeof contract !== "undefined") {
      const depositAmount = utils.parseEther("0.1");
      const gasPrice = await contract.estimateGas.depositETH({
        value: depositAmount,
      });
      console.log(
        "🚀 ~ file: dashboard.tsx ~ line 87 ~ deposit ~ g",
        utils.parseUnits(gasPrice, "gwei")
      );
      const gasLimit = utils.parseUnits("21000", "gwei");
      const overrides = {
        // gasLimit: gasPrice.mul(ethers.BigNumber.from(2)),
        gasLimit: ethers.BigNumber.from(200000),
        gasPrice,
        value: depositAmount,
      };
      try {
        const tx = await contract.depositETH(overrides);
        console.log(`Swap transaction hash: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log(
          `Swap transaction was mined in block ${receipt.blockNumber}`
        );
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      console.log("NO CONTRACT");
    }
  };

  // const fetchBalance = async () => {
  //   if (typeof contract !== "undefined") {
  //     try {
  //       let res = await contract.totalBalance();
  //       res = utils.formatEther(res);
  //       return res;
  //     } catch (err) {
  //       console.log("Error: ", err);
  //     }
  //   } else {
  //     console.log("NO CONTRACT");
  //   }
  // };

  return (
    <PageContainer>
      <Main maxWidth="49rem">
        <Button onClick={() => readValue("totalBalance", utils.formatEther)}>
          Fetch Value
        </Button>
        <Button onClick={deposit}>Deposit 0.01 ETH</Button>
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
