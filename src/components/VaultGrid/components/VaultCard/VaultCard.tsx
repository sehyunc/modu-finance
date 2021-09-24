import { useCallback, useState } from 'react'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react'
import { utils } from 'ethers'

import Background from './components/Background'
import TagSection from './components/TagSection'
import VaultDrawer from './components/VaultDrawer'
import { SymbolToColorMap } from './constants'

import useWallet from 'contexts/wallet/useWallet'

import { Vault } from 'models/Vault'

interface VaultCardProps {
  vault: Vault
}

const VaultCard: React.FC<VaultCardProps> = ({ vault }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { account, onConnectToMetaMask } = useWallet()

  const handleOpenDrawer = useCallback(() => {
    if (!account) {
      onConnectToMetaMask()
    } else {
      setIsOpen(true)
    }
  }, [account, onConnectToMetaMask])

  if (!vault) {
    return null
  }

  const {
    symbol,
    name,
    underlyingSymbol,
    cap,
    lockedAmount,
    decimals,
    platform,
  } = vault

  const formattedCap = utils.formatUnits(cap, decimals)
  const formattedLockedAmount = utils.formatUnits(lockedAmount, decimals)

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
          outline: 'none',
          transform: 'scale(1.02)',
          boxShadow: 'surface_hovered',
        }}
      >
        <Grid
          gap={0}
          p="6"
          templateColumns="1fr"
          flex="1"
          color="white"
          position="relative"
          bgGradient={`linear(to-r, ${SymbolToColorMap[underlyingSymbol].start}, ${SymbolToColorMap[underlyingSymbol].end})`}
        >
          <Background underlyingSymbol={underlyingSymbol} />
          <Stack pointerEvents="none" spacing={1} zIndex="1">
            <div>
              <TagSection
                tags={[platform, underlyingSymbol]}
                underlyingSymbol={underlyingSymbol}
              />
            </div>
            <Heading color="white">{symbol}</Heading>
            <div>
              <Text>Projected APY</Text>
              <Heading fontFamily="Epilogue">{`20%`}</Heading>
            </div>
            <div>
              <Flex align="center" justify="space-between" maxWidth="75%">
                <Text>Current Deposits</Text>
                <Text>{`${formattedLockedAmount} ${underlyingSymbol}`}</Text>
              </Flex>
              <Progress
                value={
                  (parseFloat(formattedLockedAmount) /
                    parseFloat(formattedCap)) *
                  100
                }
                width="50%"
              />
              <Flex align="center" justify="space-between" maxWidth="75%">
                <Text>Max Capacity</Text>
                <Text>{`${formattedCap} ${underlyingSymbol}`}</Text>
              </Flex>
            </div>
          </Stack>
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
