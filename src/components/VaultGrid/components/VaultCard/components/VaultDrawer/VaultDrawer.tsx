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
  Text,
  VStack,
} from '@chakra-ui/react'

import AccessibleLink from 'components/AccessibleLink'
import VaultForm from './components/VaultForm'

import { Vault } from 'models/Vault'

import { vaultNameToAddressMap } from 'utils/helpers'

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
  const vaultAddress = vaultNameToAddressMap[vault.platform][vault.symbol]
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
              <Heading size="md">Other ETH Vault Yields</Heading>
              <VaultRow />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <AccessibleLink
              href="https://app.ribbon.finance/theta-vault/T-ETH-C"
              isExternal
            >
              <Button colorScheme="gray">View on Ribbon</Button>
            </AccessibleLink>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default VaultDrawer
