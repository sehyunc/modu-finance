import { Center, Grid, Text } from "@chakra-ui/react";
import Image from "next/image";

type LeaderboardRowProps = {
  rank: number;
  name: string;
  platform: string;
  strategy: string;
  apy: string;
};

const getIcon = (platform: string) => {
  switch (platform) {
    case "Fontis":
      return "fontis.png";
    default:
      return `${platform}.svg`;
  }
};

const LeaderboardRow = ({
  rank,
  name,
  platform,
  strategy,
  apy,
}: LeaderboardRowProps) => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={6}
      bgGradient={rank === 1 ? "linear(to-l, #7928CA, #FF0080)" : ""}
      minW="100%"
      rounded="md"
      py="4"
    >
      <Center w="100%">
        <Text fontWeight="700" fontSize="xl">
          {rank}
        </Text>
      </Center>
      <Center w="100%">
        <Text fontWeight="700" fontSize="xl">
          {name}
        </Text>
      </Center>
      <Center w="100%" position="relative">
        <Image
          src={`/static/${getIcon(platform)}`}
          alt={platform}
          layout="fill"
          objectFit="contain"
        />
      </Center>
      <Center w="100%">
        <Text fontWeight="700" fontSize="md">
          {strategy}
        </Text>
      </Center>
      <Center w="100%">
        <Text fontWeight="700" fontSize="xl">
          {`${apy}%`}
        </Text>
      </Center>
    </Grid>
  );
};

export default LeaderboardRow;
