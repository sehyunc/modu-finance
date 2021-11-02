import React, { useCallback, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'

import useWallet from 'contexts/wallet/useWallet'

import { Platform, Vault } from 'models/Vault'

import VaultDrawer from 'components/VaultGrid/components/VaultCard/components/VaultDrawer'

interface RowProps {
  vault: Vault
}

const PlatformToImageMap: { [key in Platform]: string } = {
  Ribbon: '/static/ribbon.svg',
  Fontis: '/static/fontis.png',
  StakeDAO: '/static/stakedao.png',
}

const Row: React.FC<RowProps> = ({ vault }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    account,
    needsSwitchNetwork,
    onConnectToMetaMask,
    onRequestSwitchNetwork,
  } = useWallet()

  const imageUrl = PlatformToImageMap[vault.platform]

  const handleOpenDrawer = useCallback(() => {
    if (!account) {
      onConnectToMetaMask()
    } else if (needsSwitchNetwork) {
      onRequestSwitchNetwork()
    } else {
      setIsOpen(true)
    }
  }, [account, needsSwitchNetwork, onConnectToMetaMask, onRequestSwitchNetwork])

  return (
    <>
      <Box
        alignItems="center"
        backgroundColor="gray.800"
        borderBottom="3px solid #171923"
        cursor="pointer"
        display="flex"
        height="72px"
        onClick={handleOpenDrawer}
        px={12}
        py={10}
        _hover={{ backgroundColor: 'gray.700' }}
      >
        <Box
          alignItems="center"
          display="flex"
          flex={0.5}
          justifyContent="left"
        >
          <Image src={imageUrl} alt="platform" width="30px" height="30px" />
        </Box>
        <Box alignItems="center" display="flex" flex={3} justifyContent="left">
          <Text>{vault.name}</Text>
        </Box>
        <Box alignItems="center" display="flex" flex={1} justifyContent="left">
          <Text>{vault.underlyingSymbol.toUpperCase()}</Text>
        </Box>
        <Box
          alignItems="center"
          display="flex"
          flex={1}
          justifyContent="left"
          style={{ textTransform: 'capitalize' }}
        >
          <Text>{vault.platform}</Text>
        </Box>
        <Box alignItems="center" display="flex" flex={1} justifyContent="right">
          <Text>{`${String(vault.apy * 100).substr(0, 5)}%`}</Text>
        </Box>
      </Box>
      <VaultDrawer
        vault={vault}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export default Row
