import { useCallback, useState } from 'react'
import {
  Box,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Stack,
  Text,
} from '@chakra-ui/react'

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

  const { name, underlyingSymbol, platform } = vault

  return (
    <div>
      <Box
        bgGradient={`linear(to-r, ${SymbolToColorMap[underlyingSymbol].start}, ${SymbolToColorMap[underlyingSymbol].end})`}
        borderRadius="20px"
        boxShadow="surface"
        onClick={handleOpenDrawer}
        padding={1}
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
          bgGradient="linear-gradient(162.92deg, rgb(43, 43, 43) 1.36%, rgb(0, 0, 0) 94.75%)"
          borderRadius="16px"
          gap={0}
          overflow="hidden"
          padding={6}
          position="relative"
          templateColumns="1fr"
        >
          <Background underlyingSymbol={underlyingSymbol} />
          <Stack
            maxWidth="50%"
            color="white"
            pointerEvents="none"
            spacing={4}
            zIndex="1"
          >
            <div>
              <TagSection
                tags={[platform, underlyingSymbol]}
                underlyingSymbol={underlyingSymbol}
              />
            </div>
            <Heading fontWeight="medium">{name}</Heading>
            <div>
              <Stat>
                <StatNumber size="lg">{`20%`}</StatNumber>
                <StatHelpText>Projected APY</StatHelpText>
              </Stat>
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
