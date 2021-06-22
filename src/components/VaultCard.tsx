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
      bgGradient="linear(to-r,#c993ff, #415dff )"
      position="relative"
    >
      <VStack spacing="4" align="left" px="6" py="3">
        <Image src="/static/eth.svg" alt="eth" layout="fill" />
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
          <Progress value={80} />
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
