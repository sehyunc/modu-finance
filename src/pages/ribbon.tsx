import { HStack, Container, Flex, Text, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import VaultCard from "components/NewVaultCard";
import { PageContainer } from "components/PageContainer";
import { Main } from "components/Main";
import useRibbonData from "hooks/useRibbonData";

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
  const vaults = useRibbonData();
  return (
    <>
      <Box w="100%" bgColor="#000000">
        <Container maxW="6xl">
          <Flex py="16" px="4" position="relative">
            <Flex
              grow={1}
              shrink={1}
              basis="50%"
              maxW="50%"
              minH="100%"
              direction="column"
            >
              <Heading mb="6">Ribbon</Heading>
              <Text opacity="0.64">
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
      <PageContainer position="relative" bgColor="gray.900" minH="">
        <Main maxWidth="49rem" mb="6">
          <Heading>Available Vaults</Heading>
          {vaults.map(
            ({
              symbol,
              platform,
              decimals,
              underlyingSymbol,
              cap,
              lockedAmount,
              id,
            }) => (
              <VaultCard
                key={id}
                symbol={symbol}
                underlyingSymbol={underlyingSymbol}
                cap={cap}
                lockedAmount={lockedAmount}
                id={id}
                decimals={decimals}
                platform={platform}
              />
            )
          )}
        </Main>
      </PageContainer>
    </>
  );
};

export default Ribbon;
