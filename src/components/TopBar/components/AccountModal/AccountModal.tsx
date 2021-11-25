import { CopyIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import useWallet from 'contexts/wallet/useWallet'

export default function AccountModal() {
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useWallet()
  const { onCopy } = useClipboard(account || '')

  const formattedAddress = `${account?.substr(0, 6)}...${account?.substr(
    account.length - 4
  )}`

  return (
    <>
      <Button
        size="md"
        colorScheme={useColorModeValue('blue', 'gray')}
        onClick={onOpen}
      >
        {formattedAddress}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          borderRadius={20}
          bg={useColorModeValue('#eee', '#333333')}
        >
          <ModalHeader fontWeight="700">Account Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              borderColor={colorMode === 'light' ? '#bbb' : '#444444'}
              borderWidth={1}
              borderRadius={20}
              padding={6}
            >
              <Text fontSize="sm" fontWeight="500">
                Connected Wallet: {account}
              </Text>
              <Text fontSize="1.6em" fontWeight="500">
                {account?.substr(0, 8)}...{account?.substr(account.length - 6)}
              </Text>
              <Button fontSize="sm" variant="link" onClick={onCopy}>
                <CopyIcon mr={1} /> Copy Address
              </Button>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
