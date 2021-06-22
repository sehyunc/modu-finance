import {
  Box,
  Flex,
  Heading,
  Progress,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

const GRADIENTS = {
  ETH: {
    start: "#c993ff",
    end: "#415dff",
  },
  WBTC: {
    start: "#F4B86B",
    end: "#ff9d85",
  },
};

type VaultCardProps = {
  name: string;
  platform: string;
  underlying: string;
  apy: string | number;
  current: string | number;
  max: string | number;
};

const VaultCard = ({
  name,
  platform,
  underlying,
  apy,
  current,
  max,
}: VaultCardProps) => {
  return (
    <Box
      color="white"
      w="500px"
      rounded="10"
      bgGradient={`linear(to-r, ${GRADIENTS[underlying]?.start}, ${GRADIENTS[underlying]?.end})`}
      position="relative"
    >
      <VStack spacing="4" align="left" px="6" py="3">
        <Image src={`/static/${underlying}.svg`} alt="eth" layout="fill" />
        <div>
          <Tag mr="3">{platform}</Tag>
          <Tag>{underlying}</Tag>
        </div>
        <Heading>{name}</Heading>
        <div>
          <Text>Projected APY</Text>
          <Heading>{`${apy}%`}</Heading>
        </div>
        <div>
          <Flex align="center" justify="space-between">
            <Text>Current Desposits</Text>
            <Text>{`${current} ${underlying}`}</Text>
          </Flex>
          <Progress value={(parseFloat(current) / parseFloat(max)) * 100} />
          <Flex align="center" justify="space-between">
            <Text>Max Capacity</Text>
            <Text>{`${max} ${underlying}`}</Text>
          </Flex>
        </div>
      </VStack>
    </Box>
  );
};

export default VaultCard;
