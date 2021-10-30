import { Box, Container, Heading, Text } from '@chakra-ui/react'

import PlatformHeader from 'components/PlatformHeader'
import VaultGrid from 'components/VaultGrid'

import useVaults from 'contexts/vaults/useVaults'

const headerText = `
Stake DAO removes the need to stake your assets across multiple platforms.
We provide a simple solution for staking a variety of tokens all from one dashboard. 
Brand new concepts such as Social tokens will also be condensed into unique index funds, meaning users can easily gain exposure to the newest emerging digital economies.
`

const StakeDAO = () => {
  const { stakedaoVaults: vaults } = useVaults()
  return (
    <>
      <PlatformHeader
        imageUrl="/static/stakedao.png"
        text={headerText}
        title="StakeDAO"
      />
      <Box backgroundColor="gray.900" p={8} position="relative">
        <VaultGrid title="Available Vaults" vaults={vaults} />
      </Box>
    </>
  )
}

export default StakeDAO
