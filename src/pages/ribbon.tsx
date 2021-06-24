import { HStack, Container, Flex, Text, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import VaultCard from "@/components/VaultCard";

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
];

const Ribbon = () => {
  return (
    <>
      <Box w="100%" bgGradient="linear(to-r, #272a3a, #1e1d20)">
        <Container maxW="6xl">
          <Flex py="16" px="4" maxH="300px" position="relative">
            <Flex
              grow={1}
              shrink={1}
              basis="50%"
              maxW="50%"
              minH="100%"
              direction="column"
            >
              <Heading mb="6">Ribbon</Heading>
              <Text>
                Ribbon uses financial engineering to create structured products
                that deliver sustainable yield. Ribbon&apos;s first product
                focuses on yield through automated options strategies. The
                protocol also allows developers to create arbitrary structured
                products through combining various DeFi derivatives.
              </Text>
            </Flex>
            <Flex
              maxW="50%"
              align="center"
              justify="center"
              h="100%"
              w="600px"
              right="0"
              top="0"
              position="absolute"
            >
              <Image
                src={`/static/ribbon.svg`}
                alt="eth"
                width="400px"
                height="400px"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container maxW="6xl" position="relative" pt="9" bg="#000000">
        <Heading mb="6">Available Vaults</Heading>
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
      </Container>
    </>
  );
};

export default Ribbon;
