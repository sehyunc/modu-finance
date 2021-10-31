import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Progress,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { utils } from 'ethers'
import numeral from 'numeral'

import AccessibleLink from 'components/AccessibleLink'

import useWatchlist from 'contexts/watchlist/useWatchlist'

import { Vault } from 'models/Vault'

import { uuidToAddressMap } from 'utils/helpers'

import VaultForm from './components/VaultForm'
import VaultRow from './components/VaultRow'

interface VaultDrawerProps {
  vault: Vault
  isOpen: boolean
  onClose: () => void
}

const VaultDrawer: React.FC<VaultDrawerProps> = ({
  vault,
  isOpen,
  onClose,
}) => {
  const { onAddToWatchlist, onRemoveFromWatchlist, watchlist } = useWatchlist()
  const vaultAddress = "0x9b8f14554f40705de7908879e2228d2ac94fde1a"// uuidToAddressMap[vault.uuid]
  const inWatchlist = watchlist.includes(vault.id)

  const WatchlistButton = inWatchlist ? (
    <Button
      colorScheme="gray"
      mr={3}
      onClick={() => onRemoveFromWatchlist(vault.id)}
      style={{ textTransform: 'capitalize' }}
    >
      Remove from Watchlist
    </Button>
  ) : (
    <Button
      colorScheme="gray"
      mr={3}
      onClick={() => onAddToWatchlist(vault.id)}
      style={{ textTransform: 'capitalize' }}
    >
      Add To Watchlist
    </Button>
  )
  const { name, underlyingSymbol, cap, lockedAmount, decimals, platform } =
    vault

  const formattedCap = numeral(utils.formatUnits(cap, decimals)).format('0a')
  const formattedLockedAmount = numeral(
    utils.formatUnits(lockedAmount, decimals)
  ).format('0.00a')
  return (
    <Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent bg="#1c1a19">
          <DrawerCloseButton />
          <DrawerHeader>{vault.name}</DrawerHeader>
          <DrawerBody>
            <VStack align="flex-start" spacing="6">
              <VaultForm
                onClose={onClose}
                tokenSymbol={vault.underlyingSymbol}
                vaultAddress={vaultAddress}
              />
              <div>
                <Flex align="center" justify="space-between">
                  <Text>Current Deposits</Text>
                  <Tag
                    colorScheme="blue"
                    variant="solid"
                  >{`${formattedLockedAmount} ${underlyingSymbol}`}</Tag>
                </Flex>
                <Progress
                  value={(parseFloat(lockedAmount) / parseFloat(cap)) * 100}
                />
                <Flex align="center" justify="space-between">
                  <Text>Max Capacity</Text>
                  <Tag
                    colorScheme="blue"
                    variant="solid"
                  >{`${formattedCap} ${underlyingSymbol}`}</Tag>
                </Flex>
              </div>
              <Heading size="md">{`Other ${vault.underlyingSymbol} Vaults`}</Heading>
              <VaultRow />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            {WatchlistButton}
            <AccessibleLink href={vault.externalLink} isExternal>
              <Button
                colorScheme="gray"
                style={{ textTransform: 'capitalize' }}
              >{`View on ${vault.platform}`}</Button>
            </AccessibleLink>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default VaultDrawer
