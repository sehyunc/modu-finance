import { useMemo } from 'react'
import {
  AddIcon,
  CloseIcon,
  ExternalLinkIcon,
  SearchIcon,
} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { utils } from 'ethers'
import numeral from 'numeral'

import AccessibleLink from 'components/AccessibleLink'
import { SymbolToColorMap } from 'components/VaultGrid/components/VaultCard/constants'
import useWatchlist from 'contexts/watchlist/useWatchlist'

import { Vault } from 'models/Vault'

import { uuidToAddressMap } from 'utils/helpers'

import VaultForm from './components/VaultForm'
import StakeDaoVaultForm from './components/StakeDaoVaultForm'

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

  const { cap, decimals, description, lockedAmount, uuid } = vault

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
  }, [cap, decimals, lockedAmount, vault.externalLink])

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

  const Form = vault.platform === 'StakeDAO' ? StakeDaoVaultForm : VaultForm

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
            <Form
              onClose={onClose}
              platform={vault.platform}
              tokenSymbol={vault.underlyingSymbol}
              vaultAddress={vaultAddress}
              uuid={uuid}
            />
            <Box
              border="2px solid #242322"
              borderRadius="8px"
              p={6}
              width="100%"
            >
              <Text
                bgGradient={`linear(to-r, ${SymbolToColorMap.WETH.start}, ${SymbolToColorMap.WETH.end})`}
                bgClip="text"
                fontSize="lg"
                fontWeight="bold"
                mb={3}
              >
                Info
              </Text>
              {CapacityRow}
            </Box>
            <Box
              border="2px solid #242322"
              borderRadius="8px"
              p={6}
              width="100%"
            >
              <Text
                bgGradient={`linear(to-r, ${SymbolToColorMap.WETH.start}, ${SymbolToColorMap.WETH.end})`}
                bgClip="text"
                fontSize="lg"
                fontWeight="bold"
                mb={3}
              >
                Description
              </Text>
              <Text>{description}</Text>
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
