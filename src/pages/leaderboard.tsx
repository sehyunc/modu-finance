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
      <Container maxW="6xl">
        <Heading mt="6">Leaderboard</Heading>
        <ButtonGroup size="sm" isAttached variant="outline" my="6">
          <Button mr="-px">All Time</Button>
          <Button mr="-px">This Week</Button>
          <Button mr="-px">This Month</Button>
        </ButtonGroup>
      </Container>
      <Container maxW="6xl" bg="#1a1f2c" rounded="md" py="16px">
        <Grid
          fontWeight="700"
          fontSize="xl"
          templateColumns="repeat(5, 1fr)"
          gap={6}
          pb="5"
          pt="2"
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
      </Container>
    </>
  );
};

export default Leaderboard;
