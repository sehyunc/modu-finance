import { Box, Heading } from '@chakra-ui/react'

import PlatformHeader from 'components/PlatformHeader'
import VaultGrid from 'components/VaultGrid'

import useVaults from 'contexts/vaults/useVaults'

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
      <PlatformHeader
        imageUrl="/static/fontis.png"
        text={headerText}
        title="Fontis"
      />
      <Box backgroundColor="gray.900" p={8} position="relative">
        <VaultGrid title="Available Vaults" vaults={vaults} />
      </Box>
    </>
  )
}

export default Fontis
