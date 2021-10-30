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
  Heading,
  VStack,
} from '@chakra-ui/react'

import AccessibleLink from 'components/AccessibleLink'

import useWatchlist from 'contexts/watchlist/useWatchlist'

import { Vault } from 'models/Vault'

import { vaultSymbolToAddressMap, uuidToAddressMap } from 'utils/helpers'

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
  const vaultAddress = uuidToAddressMap[vault.uuid]
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
