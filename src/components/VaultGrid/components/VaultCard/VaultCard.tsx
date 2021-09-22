import { useCallback, useState } from "react"
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Progress,
  Tag,
  Text,
} from "@chakra-ui/react"
import { utils } from "ethers"

import VaultDrawer from "./components/VaultDrawer"

import useWallet from "contexts/wallet/useWallet"

import { Vault } from "models/Vault"

const COLORS: {
  [key: string]: {
    start: string
    end: string
    tag: string
  }
} = {
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
  USDC: {
    start: "#729ff3",
    end: "#009EF7",
    tag: "blue",
  },
}

interface VaultCardProps {
  vault: Vault
}

const VaultCard: React.FC<VaultCardProps> = ({ vault }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { account } = useWallet()

  const handleOpenDrawer = useCallback(() => {
    setIsOpen(!!account)
  }, [account])

  // TODO: Probably shouldn't return null here
  if (!vault) {
    return null
  }

  const {
    symbol,
    name,
    underlyingSymbol: underlying,
    cap,
    lockedAmount,
    decimals,
    platform,
  } = vault
  const parsedCap = utils.formatUnits(cap, decimals)
  const parsedLockedAmount = utils.formatUnits(lockedAmount, decimals)

  return (
    <div>
      <Box
        onClick={handleOpenDrawer}
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
                {platform}
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
      <VaultDrawer
        vault={vault}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export default VaultCard
