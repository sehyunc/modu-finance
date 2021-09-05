import { Vault } from "@/models/Vault";
import { vaultAtom } from "@/utils/atoms";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Progress,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { utils } from "ethers";

interface Props {}
const COLORS: ICOLORS = {
  WETH: {
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
interface color {
  start: string;
  end: string;
  tag: string;
}

interface ICOLORS {
  [key: string]: color;
}

const NewVaultCard = (props: Vault) => {
  const {
    symbol,
    underlyingSymbol: underlying,
    cap,
    lockedAmount,
    decimals,
  } = props;
  console.log("🚀 ~ NewVaultCard ~ decimals", decimals);
  const [, setVault] = useAtom(vaultAtom);
  const parsedCap = utils.formatUnits(cap, decimals);
  const parsedLockedAmount = utils.formatUnits(lockedAmount, decimals);
  return (
    <Box
      onClick={() => setVault(symbol)}
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
          src={`/static/${underlying.toLowerCase()}.svg`}
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
              {"Platform"}
            </Tag>
            <Tag variant="solid" colorScheme={COLORS[underlying]?.tag}>
              {underlying}
            </Tag>
          </Box>
          <Heading color="white">{symbol}</Heading>
          <div>
            <Text>Projected APY</Text>
            <Heading fontFamily="Epilogue">{`20%`}</Heading>
          </div>
          <div>
            <Flex align="center" justify="space-between">
              <Text>Current Deposits</Text>
              <Text>{`${parsedLockedAmount} ${underlying}`}</Text>
            </Flex>
            <Progress
              value={
                (parseFloat(parsedLockedAmount.toString()) /
                  parseFloat(parsedCap.toString())) *
                100
              }
            />
            <Flex align="center" justify="space-between">
              <Text>Max Capacity</Text>
              <Text>{`${parsedCap.toString()} ${underlying}`}</Text>
            </Flex>
          </div>
        </Box>
      </Grid>
    </Box>
  );
};

export default NewVaultCard;
