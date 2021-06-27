import { HStack, Container, Flex, Text, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import VaultCard from "@/components/VaultCard";
import { PageContainer } from "@/components/PageContainer";
import { Main } from "@/components/Main";

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

const Fontis = () => {
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
              <Heading mb="6">Fontis</Heading>
              <Text>
                Fontis finance enables users to earn a yield by depositing
                assets into perpetual vaults trading options strategies. Fontis
                creates products with a perpetual position out of instruments
                with expiries, enabling users to invest in long term strategies
                without active management. Vaults are capped in the total amount
                that can be deposited to make sure strategies are fulfilled and
                users can get the best yield.
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
                src={`/static/fontis.png`}
                alt="eth"
                width="400px"
                height="400px"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>
      <PageContainer position="relative" bg="#000000">
        <Main width="100%">
          <Heading>Available Vaults</Heading>
          <HStack align="center" spacing="12">
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
        </Main>
      </PageContainer>
    </>
  );
};

export default Fontis;
