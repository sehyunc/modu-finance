import VaultCard from "@/components/VaultCard";
import { Box } from "@chakra-ui/layout";
import { Heading, HStack } from "@chakra-ui/react";

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
const Home = () => {
  return (
    <Box mb={8} w="full">
      <Heading mt="6">Your Vaults</Heading>
      <HStack align="center" p="6" spacing="12">
        {CURRENT_VAULTS.map(
          ({ name, platform, underlying, apy, current, max }) => (
            <VaultCard
              key={name}
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
      <Heading mt="6">Watchlist</Heading>
      <HStack align="center" p="6" spacing="12">
        {WATCH_VAULTS.map(
          ({ name, platform, underlying, apy, current, max }) => (
            <VaultCard
              key={name}
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
    </Box>
  );
};

export default Home;
