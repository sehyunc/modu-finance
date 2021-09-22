import { Main } from "components/Main"
import { PageContainer } from "components/PageContainer"
import VaultCard from "components/VaultCard"
import { Heading, HStack } from "@chakra-ui/react"
import useVaults from "contexts/vaults/useVaults"

import VaultGrid from "components/VaultGrid"

const Dashboard = () => {
  const { vaults } = useVaults()

  return (
    <PageContainer>
      <Main maxWidth="49rem">
        <Heading>My Vaults</Heading>
        <VaultGrid vaults={vaults} />
        <Heading>Watchlist</Heading>
        <VaultGrid vaults={vaults} />
      </Main>
    </PageContainer>
  )
}

export default Dashboard
