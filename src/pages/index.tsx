import { Box } from "@chakra-ui/layout";
import { Flex, Heading, HStack } from "@chakra-ui/react";
import VaultCard from "@/components/VaultCard";

const VAULTS = [
  {
    name: "T-ETH-C",
    platform: "Ribbon",
    underlying: "ETH",
    apy: "6.98",
    current: "12",
    max: "120",
  },
  {
    name: "T-ETH-C",
    platform: "Ribbon",
    underlying: "ETH",
    apy: "6.98",
    current: "12",
    max: "120",
  },
  {
    name: "T-ETH-C",
    platform: "Ribbon",
    underlying: "ETH",
    apy: "6.98",
    current: "12",
    max: "120",
  },
];

const Home = () => {
  return (
    <Box mb={8} w="full">
      <Heading>Your Vaults</Heading>
      <HStack align="center" justify="space-evenly" p="6" spacing="6">
        {VAULTS.map(({ name, platform, underlying, apy, current, max }) => (
          <VaultCard
            key={name}
            name={name}
            platform={platform}
            underlying={underlying}
            apy={apy}
            current={current}
            max={max}
          />
        ))}
      </HStack>
      {/* <Heading>Watchlist</Heading> */}
    </Box>
  );
};

export default Home;
