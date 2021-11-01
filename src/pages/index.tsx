import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Center, HStack, Stack, Text } from '@chakra-ui/react'

import AccessibleLink from 'components/AccessibleLink'
import Footer from 'components/Footer'
import LandingNavbar from 'components/LandingTopBar/LandingTopBar'
import { SymbolToColorMap } from 'components/VaultGrid/components/VaultCard/constants'

const Home: React.FC = () => {
  return (
    <Center backgroundColor="#000" height="100vh" position="relative">
      <Box position="absolute" top={0}>
        <LandingNavbar />
      </Box>
      <Stack textAlign="center">
        <Text
          bgGradient={`linear(to-r, ${SymbolToColorMap.WETH.start}, ${SymbolToColorMap.WETH.end})`}
          bgClip="text"
          fontWeight="bold"
          fontSize={{ base: '10vw', md: '6xl', xl: '75px' }}
        >
          Modu Vault Aggregator
        </Text>
        <Stack>
          <Text fontWeight="semibold" fontSize="lg">
            Find and compare vault strategies across the Opyn ecosystem
          </Text>
          <HStack justifyContent="center">
            <Text fontWeight="semibold" fontSize="lg">
              for the
            </Text>
            <Text
              bgGradient={`linear(to-r, ${SymbolToColorMap.WETH.end}, ${SymbolToColorMap.WETH.start})`}
              bgClip="text"
              fontSize="lg"
              fontWeight="semibold"
            >
              biggest bang for your buck
            </Text>
          </HStack>
        </Stack>
        <AccessibleLink href="/dashboard">
          <Button
            marginTop={6}
            size="lg"
            variant="outline"
            colorScheme="gray"
            rightIcon={<ArrowForwardIcon />}
          >
            Enter App
          </Button>
        </AccessibleLink>
      </Stack>
      <Box bottom={0} position="absolute">
        <Footer />
      </Box>
    </Center>
  )
}

export default Home
