import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Grid,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { PageContainer } from "components/PageContainer";
import Header from "components/Leaderboard/components/Header";
import Row from "components/Leaderboard/components/Row";
import { useRibbonData } from "hooks";

const ROWS = [
  {
    name: "T-ETH-C",
    platform: "Ribbon",
    strategy: "Covered Call",
    apy: "9.23",
  },
  {
    name: "Theta-Gang",
    platform: "Fontis",
    strategy: "Covered Call",
    apy: "6.78",
  },
  {
    name: "Theta-Gang",
    platform: "Fontis",
    strategy: "Covered Call",
    apy: "6.78",
  },
  {
    name: "T-BTC-C",
    platform: "Ribbon",
    strategy: "Covered Call",
    apy: "2.31",
  },
];

const Leaderboard = () => {
  const vaults = useRibbonData();
  return (
    <>
      <Box
        alignItems="center"
        borderBottom="1px solid #000"
        display="flex"
        height="44px"
        width="100%"
      >
        <Header title="Vault Name" flex={3} />
        <Header title="Platform" />
        <Header title="Strategy" />
        <Header align="right" title="APY" />
      </Box>

      {vaults.map((vault) => {
        return <Row key={vault.id} vault={vault} />;
      })}
    </>
  );
};

export default Leaderboard;
