import { HStack, Container, Flex, Text, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import VaultCard from "components/VaultCard";
import { PageContainer } from "components/PageContainer";
import { Main } from "components/Main";
import { useFontisData } from "hooks";

import useVaults from "contexts/vaults/useVaults";

const Fontis = () => {
  const { fontisVaults: vaults } = useVaults();
  console.log("🚀 ~ Fontis ~ vaults", vaults);
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
              <Heading mb="6">Fontis</Heading>
              <Text opacity="0.64">
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
      <PageContainer position="relative" bg="gray.900" minH="">
        <Main mb="6">
          <Heading>Available Vaults</Heading>
          <HStack align="center" spacing="12">
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
          </HStack>
        </Main>
      </PageContainer>
    </>
  );
};

export default Fontis;
