import { HStack, Container, Flex, Text, Box, Heading } from "@chakra-ui/react"
import Image from "next/image"
import VaultCard from "components/VaultCard"
import { PageContainer } from "components/PageContainer"
import { Main } from "components/Main"
import PlatformHeader from "components/PlatformHeader"

import useVaults from "contexts/vaults/useVaults"
const headerText = `
                Ribbon uses financial engineering to create structured products
                that deliver sustainable yield. Ribbon&apos;s first product
                focuses on yield through automated options strategies. The
                protocol also allows developers to create arbitrary structured
                products through combining various DeFi derivatives.
`

const Ribbon = () => {
  const { ribbonVaults: vaults } = useVaults()
  return (
    <>
      <Box w="100%" bgColor="#000000">
        <Container maxW="6xl">
          <PlatformHeader
            imageUrl="/static/ribbon.svg"
            text={headerText}
            title="Ribbon"
          />
        </Container>
      </Box>
      <PageContainer position="relative" bgColor="gray.900" minH="">
        <Main maxWidth="49rem" mb="6">
          <Heading>Available Vaults</Heading>
          {vaults.map((vault) => (
            <VaultCard key={vault.id} vault={vault} />
          ))}
        </Main>
      </PageContainer>
    </>
  )
}

export default Ribbon
