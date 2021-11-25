import { Button, ButtonGroup } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {}

const TopBar = (props: Props) => {
  const router = useRouter()
  const pathname = router.pathname
  const background = 'linear(to-r, #3498db, #60ebfc)'
  return (
    <Box
      alignItems="center"
      display="flex"
      flex={1}
      marginTop={6}
      justifyContent="center"
    >
      <Button
        onClick={() => router.push('/')}
        size="lg"
        mr={8}
        _focus={{ boxShadow: 'none' }}
      >
        Home
      </Button>
      <Button
        colorScheme="purple"
        onClick={() => router.push('/leaderboard')}
        size="lg"
        _focus={{ boxShadow: 'none' }}
      >
        Leaderboard
      </Button>
    </Box>
  )
}

export default TopBar
