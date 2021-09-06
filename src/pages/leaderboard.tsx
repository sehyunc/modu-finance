import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Grid,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import LeaderboardRow from "components/LeaderboardRow";
import { PageContainer } from "components/PageContainer";
import { Main } from "components/Main";

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
  return (
    <>
      <PageContainer>
        <Main width="100%">
          <Heading>Leaderboard</Heading>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button mr="-px">All Time</Button>
            <Button mr="-px">This Week</Button>
            <Button mr="-px">This Month</Button>
          </ButtonGroup>
          <Grid
            fontWeight="700"
            fontSize="xl"
            templateColumns="repeat(5, 1fr)"
            gap={6}
          >
            <Center>
              <Text>Rank</Text>
            </Center>
            <Center>
              <Text>Name</Text>
            </Center>
            <Center>
              <Text>Platform</Text>
            </Center>
            <Center>
              <Text>Strategy</Text>
            </Center>
            <Center>
              <Text>Projected APY</Text>
            </Center>
          </Grid>
          <VStack spacing="6">
            {ROWS.map(({ name, platform, strategy, apy }, index) => (
              <LeaderboardRow
                key={index}
                rank={index + 1}
                name={name}
                platform={platform}
                strategy={strategy}
                apy={apy}
              />
            ))}
          </VStack>
        </Main>
      </PageContainer>
      {/* <Container maxW="6xl" bg="#1a1f2c" rounded="md" py="16px"> */}
      {/* </Container> */}
    </>
  );
};

export default Leaderboard;
