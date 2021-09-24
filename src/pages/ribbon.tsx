import { Box, Container, Heading } from '@chakra-ui/react'

import { Main } from 'components/Main'
import { PageContainer } from 'components/PageContainer'
import PlatformHeader from 'components/PlatformHeader'
import VaultGrid from 'components/VaultGrid'

import useVaults from 'contexts/vaults/useVaults'

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
          <VaultGrid vaults={vaults} />
        </Main>
      </PageContainer>
    </>
  )
}

export default Ribbon
