import { Flex, Spacer, Text } from '@chakra-ui/react'
import Image from 'next/image'

const VaultRow = () => (
  <Flex
    bg="#252322"
    px="6"
    borderRadius="lg"
    h="50px"
    w="100%"
    align="center"
    position="relative"
    fontWeight="semibold"
  >
    <Image src={`/static/ribbon.svg`} alt="eth" width="30px" height="30px" />
    <Text ml="3">T-ETH-C</Text>
    <Spacer />
    <Text>10.08%</Text>
  </Flex>
)

export default VaultRow
