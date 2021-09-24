import { Stack, Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import AccessibleLink from 'components/AccessibleLink'
import Footer from 'components/Footer'
import LandingNavbar from 'components/LandingTopBar/LandingTopBar'

const Home: React.FC = () => {
  return (
    <>
      <Center height="100vh" position="relative">
        <Box position="absolute" top={0}>
          <LandingNavbar />
        </Box>
        <Stack spacing={6} textAlign="center">
          <Heading fontSize={{ base: '10vw', md: '6vw', xl: '75px' }}>
            Modu Vault Aggregator
          </Heading>
          <Text>Find and compare strategies across the Opyn ecosystem</Text>
          <AccessibleLink href="/dashboard" isExternal>
            <Button
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
    </>
  )
}

export default Home
