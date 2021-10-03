import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import { WarningIcon } from '@chakra-ui/icons'

import useWallet from 'contexts/wallet/useWallet'

const WrongNetworkModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onRequestSwitchNetwork } = useWallet()

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        rightIcon={<WarningIcon />}
        variant="solid"
      >
        Wrong Network
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          borderRadius={20}
          bg={useColorModeValue('#eee', '#333333')}
        >
          <ModalHeader fontWeight="700">Switch Network</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please switch to the Kovan Network</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={useColorModeValue('blue', 'gray')}
              variant="solid"
              onClick={onRequestSwitchNetwork}
            >
              Switch Network
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WrongNetworkModal
