import {
  Text,
  Flex,
  Center,
  Container,
  Grid,
  Box,
  Heading,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";

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
          <Center w="100%" h="10">
            Rank
          </Center>
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
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={6}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          minW="100%"
          rounded="md"
          py="3"
        >
          <Center w="100%" h="10">
            <Text fontWeight="700" fontSize="xl">
              1
            </Text>
          </Center>
          <Center w="100%" h="10">
            <Text fontWeight="700" fontSize="xl">
              T-ETH-C
            </Text>
          </Center>
          <Center w="100%" h="10" position="relative">
            <Image
              src={`/static/ribbon.svg`}
              alt="ribbon"
              layout="fill"
              objectFit="contain"
            />
          </Center>
          <Center w="100%" h="10">
            <Text fontWeight="700" fontSize="md">
              Covered Call
            </Text>
          </Center>
          <Center w="100%" h="10">
            <Text fontWeight="700" fontSize="xl">
              100%
            </Text>
          </Center>
        </Grid>
      </Container>
    </>
  );
};

export default Leaderboard;
