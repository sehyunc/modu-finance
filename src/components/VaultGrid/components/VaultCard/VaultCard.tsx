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

  const { apy, name, underlyingSymbol, cap, lockedAmount, decimals, platform } =
    vault

  const formattedCap = numeral(utils.formatUnits(cap, decimals)).format('0a')
  const formattedLockedAmount = numeral(
    utils.formatUnits(lockedAmount, decimals)
  ).format('0.00a')
  const formattedApy = numeral(apy).format('0%')

  return (
    <div>
      <Box
        bgGradient={`linear(to-r, ${SymbolToColorMap[underlyingSymbol].start}, ${SymbolToColorMap[underlyingSymbol].end})`}
        borderRadius="20px"
        padding={2}
        cursor="pointer"
        onClick={handleOpenDrawer}
        transition={`
      transform 0.5s cubic-bezier(0, 0.28, 0.45, 0.95),
      box-shadow 0.5s cubic-bezier(0, 0.28, 0.45, 0.95)
      `}
        _hover={{ boxShadow: 'surface_hovered', transform: 'scale(1.02)' }}
      >
        <Box
          bgGradient="linear-gradient(162.92deg, rgb(43, 43, 43) 12.36%, rgb(0, 0, 0) 94.75%)"
          borderRadius="14px"
          overflow="hidden"
        >
          <Grid gap={0} padding={6} templateColumns="1fr" position="relative">
            <Background underlyingSymbol={underlyingSymbol} />
            <Stack spacing={6} zIndex="1">
              <div>
                <TagSection
                  tags={[platform, underlyingSymbol]}
                  underlyingSymbol={underlyingSymbol}
                />
              </div>
              <Heading color="white">{name}</Heading>
              <div>
                <Text>Projected APY</Text>
                <Heading fontFamily="Epilogue">{formattedApy}</Heading>
              </div>
            </Stack>
          </Grid>
        </Box>
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
