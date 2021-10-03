import { useCallback, useState } from 'react'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Progress,
  Stack,
  Text,
  Tag,
} from '@chakra-ui/react'
import { utils } from 'ethers'
import numeral from 'numeral'

import useWallet from 'contexts/wallet/useWallet'

import { Vault } from 'models/Vault'

import Background from './components/Background'
import TagSection from './components/TagSection'
import VaultDrawer from './components/VaultDrawer'
import { SymbolToColorMap } from './constants'

interface VaultCardProps {
  vault: Vault
}

const VaultCard: React.FC<VaultCardProps> = ({ vault }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    account,
    needsSwitchNetwork,
    onConnectToMetaMask,
    onRequestSwitchNetwork,
  } = useWallet()

  const handleOpenDrawer = useCallback(() => {
    if (!account) {
      onConnectToMetaMask()
    } else if (needsSwitchNetwork) {
      onRequestSwitchNetwork()
    } else {
      setIsOpen(true)
    }
  }, [account, needsSwitchNetwork, onConnectToMetaMask, onRequestSwitchNetwork])

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

  const formattedCap = numeral(utils.formatUnits(cap, decimals)).format('0a')
  const formattedLockedAmount = numeral(
    utils.formatUnits(lockedAmount, decimals)
  ).format('0.00a')

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
                <Tag
                  colorScheme="blue"
                  variant="solid"
                >{`${formattedLockedAmount} ${underlyingSymbol}`}</Tag>
              </Flex>
              <Progress
                value={(parseFloat(lockedAmount) / parseFloat(cap)) * 100}
                width="50%"
              />
              <Flex align="center" justify="space-between" maxWidth="75%">
                <Text>Max Capacity</Text>
                <Tag
                  colorScheme="blue"
                  variant="solid"
                >{`${formattedCap} ${underlyingSymbol}`}</Tag>
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
