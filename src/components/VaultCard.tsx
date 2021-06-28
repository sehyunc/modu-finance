import {
  Image,
  Grid,
  Box,
  Flex,
  Heading,
  Progress,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
// import Image from "next/image";
import AccessibleLink from "@/components/AccessibleLink";

const COLORS = {
  ETH: {
    start: "#c993ff",
    end: "#415dff",
    tag: "purple",
  },
  WBTC: {
    start: "#F4B86B",
    end: "#ff9d85",
    tag: "yellow",
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
    <AccessibleLink href={`/${platform.toLowerCase()}/${name.toLowerCase()}`}>
      <Box
        minW="30rem"
        borderRadius="lg"
        boxShadow="surface"
        overflow="hidden"
        cursor="pointer"
        transition={`
        transform 0.5s cubic-bezier(0, 0.28, 0.45, 0.95),
        box-shadow 0.5s cubic-bezier(0, 0.28, 0.45, 0.95)
        
        `}
        _hover={{
          outline: "none",
          transform: "scale(1.02)",
          boxShadow: "surface_hovered",
        }}
        _focus={{
          outline: "none",
          transform: "scale(1.02)",
          boxShadow: "surface_hovered",
        }}
      >
        <Grid
          gap={0}
          p="6"
          templateColumns="1fr"
          flex="1"
          color="white"
          position="relative"
          bgGradient={`linear(to-r, ${COLORS[underlying]?.start}, ${COLORS[underlying]?.end})`}
        >
          <Image
            // zIndex="1"
            src={`/static/${underlying}.svg`}
            alt="logo"
            minH="100%"
            minW="100%"
            transformOrigin="50% 50%"
            maxWidth="150%"
            position="absolute"
            userSelect="none"
            right="0"
            transition={`
            transform 0.5s cubic-bezier(0, 0.28, 0.45, 0.95)
          `}
            _hover={{
              transition: `
              transform 0.5s cubic-bezier(0, 0.28, 0.45, 0.95),
              box-shadow 0.5s cubic-bezier(0, 0.28, 0.45, 0.95)
              `,
              transform: "scale(1.2)",
            }}
          />
          <Box pointerEvents="none" zIndex="1">
            <Box mb="1">
              <Tag variant="solid" colorScheme={COLORS[underlying]?.tag} mr="3">
                {platform}
              </Tag>
              <Tag variant="solid" colorScheme={COLORS[underlying]?.tag}>
                {underlying}
              </Tag>
            </Box>
            <Heading color="white">{"ETH-A"}</Heading>
            <div>
              <Text>Projected APY</Text>
              <Heading fontFamily="Epilogue">{`${apy}%`}</Heading>
            </div>
            <div>
              <Flex align="center" justify="space-between">
                <Text>Current Deposits</Text>
                <Text>{`${current} ${underlying}`}</Text>
              </Flex>
              <Progress value={(parseFloat(current) / parseFloat(max)) * 100} />
              <Flex align="center" justify="space-between">
                <Text>Max Capacity</Text>
                <Text>{`${max} ${underlying}`}</Text>
              </Flex>
            </div>
          </Box>
        </Grid>
      </Box>
    </AccessibleLink>
  );
};

export default VaultCard;
