import { useMemo } from 'react'
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
import {
  ExternalLinkIcon,
  SearchIcon,
  AddIcon,
  CloseIcon,
} from '@chakra-ui/icons'
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

  const { cap, decimals, lockedAmount, uuid } = vault

  const vaultAddress = uuidToAddressMap[uuid]

  const CapacityRow = useMemo(() => {
    if (!cap) {
      return (
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          style={{ fontWeight: 'bold' }}
        >
          <Text>Current Vault Capacity</Text>
          <AccessibleLink href={vault.externalLink} isExternal>
            <Button rightIcon={<ExternalLinkIcon />} variant="ghost">
              View in App
            </Button>
          </AccessibleLink>
        </Box>
      )
    }
    const vaultCapacityPercentage = numeral(
      parseFloat(utils.formatUnits(lockedAmount, decimals)) /
        parseFloat(utils.formatUnits(cap, decimals))
    ).format('0%')
    return (
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        style={{ fontWeight: 'bold' }}
      >
        <Text>Current Vault Capacity</Text>
        <Text>{vaultCapacityPercentage}</Text>
      </Box>
    )
  }, [cap, decimals, lockedAmount])

  const ExternalLinkButton = (
    <AccessibleLink href={vault.externalLink} isExternal>
      <Button
        colorScheme="gray"
        rightIcon={<SearchIcon />}
        style={{ textTransform: 'capitalize' }}
        variant="outline"
      >{`View on ${vault.platform}`}</Button>
    </AccessibleLink>
  )

  const inWatchlist = watchlist.includes(vault.id)

  const WatchlistButton = inWatchlist ? (
    <Button
      colorScheme="gray"
      mr={3}
      onClick={() => onRemoveFromWatchlist(vault.id)}
      rightIcon={<CloseIcon />}
      style={{ textTransform: 'capitalize' }}
      variant="outline"
    >
      Remove from Watchlist
    </Button>
  ) : (
    <Button
      colorScheme="gray"
      mr={3}
      onClick={() => onAddToWatchlist(vault.id)}
      rightIcon={<AddIcon />}
      style={{ textTransform: 'capitalize' }}
      variant="outline"
    >
      Add To Watchlist
    </Button>
  )

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg="#1c1a19">
        <DrawerCloseButton />
        <DrawerHeader>{vault.name}</DrawerHeader>
        <DrawerBody>
          <VStack spacing={6}>
            <VaultForm
              onClose={onClose}
              platform={vault.platform}
              tokenSymbol={vault.underlyingSymbol}
              vaultAddress={vaultAddress}
            />
            <Box
              border="2px solid #242322"
              borderRadius="8px"
              p={6}
              width="100%"
            >
              {CapacityRow}
            </Box>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          {WatchlistButton}
          {ExternalLinkButton}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default VaultDrawer
