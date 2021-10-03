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

import { vaultSymbolToAddressMap } from 'utils/helpers'

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
  const { onAddToWatchlist } = useWatchlist()
  const vaultAddress = vaultSymbolToAddressMap[vault.platform][vault.symbol]
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
            <Button
              colorScheme="gray"
              onClick={() => onAddToWatchlist(vault.id)}
              style={{ textTransform: 'capitalize' }}
            >
              Add To Watchlist
            </Button>
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
