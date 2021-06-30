import { Center, Grid, Text, Tooltip } from "@chakra-ui/react";
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
      return `${platform.toLowerCase()}.svg`;
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
      bg={rank === 1 ? "" : "#15171e"}
      minW="100%"
      rounded="md"
      py="4"
      fontWeight="700"
      fontSize="xl"
    >
      <Center>
        <Text>{rank}</Text>
      </Center>
      <Center>
        <Text>{name}</Text>
      </Center>
      <Tooltip hasArrow label={platform} placement="top" aria-label="platform">
        <Center position="relative">
          <Image
            src={`/static/${getIcon(platform)}`}
            alt={platform}
            layout="fill"
            objectFit="contain"
          />
        </Center>
      </Tooltip>
      <Center>
        <Text>{strategy}</Text>
      </Center>
      <Center>
        <Text>{`${apy}%`}</Text>
      </Center>
    </Grid>
  );
};

export default LeaderboardRow;
