import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Grid,
  Heading,
  VStack,
} from "@chakra-ui/react";
import LeaderboardRow from "@/components/LeaderboardRow";

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
      <Heading mt="6">Leaderboard</Heading>
      <ButtonGroup size="sm" isAttached variant="outline" p="6">
        <Button mr="-px">All Time</Button>
        <Button mr="-px">This Week</Button>
        <Button mr="-px">This Month</Button>
      </ButtonGroup>
      <Container maxW="4xl">
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <Center w="100%">Rank</Center>
          <Center w="100%" h="10">
            Name
          </Center>
          <Center w="100%" h="10">
            Platform
          </Center>
          <Center w="100%" h="10">
            Strategy
          </Center>
          <Center w="100%" h="10">
            Projected APY
          </Center>
        </Grid>
        <VStack spacing="3">
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
      </Container>
    </>
  );
};

export default Leaderboard;
