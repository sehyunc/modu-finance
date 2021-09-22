import { HStack, Container, Flex, Text, Box, Heading } from "@chakra-ui/react"
import Image from "next/image"
import VaultCard from "components/VaultCard"
import { PageContainer } from "components/PageContainer"
import { Main } from "components/Main"
import PlatformHeader from "components/PlatformHeader"

import useVaults from "contexts/vaults/useVaults"

const headerText = `
                Fontis finance enables users to earn a yield by depositing
                assets into perpetual vaults trading options strategies. Fontis
                creates products with a perpetual position out of instruments
                with expiries, enabling users to invest in long term strategies
                without active management. Vaults are capped in the total amount
                that can be deposited to make sure strategies are fulfilled and
                users can get the best yield.
`

const Fontis = () => {
  const { fontisVaults: vaults } = useVaults()

  return (
    <>
      <Box w="100%" bgColor="#000000">
        <Container maxW="6xl">
          <PlatformHeader
            imageUrl="/static/fontis.png"
            text={headerText}
            title="Fontis"
          />
        </Container>
      </Box>
      <PageContainer position="relative" bg="gray.900" minH="">
        <Main mb="6">
          <Heading>Available Vaults</Heading>
          <HStack align="center" spacing="12">
            {vaults.map((vault) => (
              <VaultCard key={vault.id} vault={vault} />
            ))}
          </HStack>
        </Main>
      </PageContainer>
    </>
  )
}

export default Fontis
