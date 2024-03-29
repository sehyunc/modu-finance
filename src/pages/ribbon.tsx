import { Box, Heading } from '@chakra-ui/react'

import PlatformHeader from 'components/PlatformHeader'
import VaultGrid from 'components/VaultGrid'

import useVaults from 'contexts/vaults/useVaults'

const headerText = `
                Ribbon uses financial engineering to create structured products
                that deliver sustainable yield. Ribbon's first product
                focuses on yield through automated options strategies. The
                protocol also allows developers to create arbitrary structured
                products through combining various DeFi derivatives.
`

const Ribbon = () => {
  const { ribbonVaults: vaults } = useVaults()
  return (
    <>
      <PlatformHeader
        imageUrl="/static/ribbon.svg"
        text={headerText}
        title="Ribbon"
      />
      <Box backgroundColor="gray.900" p={8} position="relative">
        <VaultGrid title="Available Vaults" vaults={vaults} />
      </Box>
    </>
  )
}

export default Ribbon
