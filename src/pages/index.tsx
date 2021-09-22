import { Button, Heading, Center, Text } from "@chakra-ui/react"

import AccessibleLink from "components/AccessibleLink"
import { Main } from "components/Main"
import { PageContainer } from "components/PageContainer"

const Home: React.FC = () => {
  return (
    <PageContainer>
      <Main mx="auto" textAlign="center">
        <Heading fontSize={{ base: "10vw", md: "6vw", xl: "75px" }} mt="22vh">
          Vault Aggregator
        </Heading>
        <Text>Find and compare strategies across the Opyn ecosystem</Text>
        <Center maxWidth="60rem" py={2}>
          <AccessibleLink href="/dashboard" isExternal>
            <Button size="lg" width="100%" variant="outline" colorScheme="gray">
              Enter App
            </Button>
          </AccessibleLink>
        </Center>
      </Main>
    </PageContainer>
  )
}

export default Home
