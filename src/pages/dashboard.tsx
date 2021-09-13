import { Main } from "components/Main";
import { PageContainer } from "components/PageContainer";
import VaultCard from "components/VaultCard";
import { Heading, HStack } from "@chakra-ui/react";
import useVaults from "contexts/vaults/useVaults";

const Dashboard = () => {
  const { vaults } = useVaults();

  return (
    <PageContainer>
      <Main maxWidth="49rem">
        <Heading>My Vaults</Heading>
        <HStack align="center" spacing="12">
          {vaults.map((vault) => (
            <VaultCard key={vault.id} vault={vault} />
          ))}
        </HStack>
        <Heading>Watchlist</Heading>
        <HStack align="center" spacing="12">
          {vaults.map((vault) => (
            <VaultCard key={vault.id} vault={vault} />
          ))}
        </HStack>
      </Main>
    </PageContainer>
  );
};

export default Dashboard;
