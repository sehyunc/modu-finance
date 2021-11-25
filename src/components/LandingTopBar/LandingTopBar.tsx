import { ReactNode } from 'react'
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  StackProps,
  useColorMode,
} from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai'
import { CgDarkMode } from 'react-icons/cg'

import AccessibleLink from 'components/AccessibleLink'

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label={`Toggle ${colorMode} mode`}
      variant="ghost"
      fontSize="xl"
      onClick={toggleColorMode}
      icon={<CgDarkMode />}
    />
  )
}

interface MenuItemProps {
  children: ReactNode
  to: string
}

export const MenuItem = ({
  children,
  to = '/',
  ...props
}: MenuItemProps & ButtonProps) => {
  return (
    <AccessibleLink href={to}>
      <Button
        size="md"
        width="100%"
        variant="ghost"
        colorScheme="gray"
        {...props}
      >
        {children}
      </Button>
    </AccessibleLink>
  )
}

export const MenuStack = (props: StackProps) => (
  <Stack
    spacing={{ base: 0, md: 4 }}
    align="center"
    justify="flex-end"
    {...props}
  >
    <HStack pb={{ base: 4, md: 0 }}>
      <MenuItem to="/leaderboard">Enter App</MenuItem>
    </HStack>
    {/* <HStack>
      <DarkModeSwitch />
    </HStack> */}
  </Stack>
)

const TopBar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
    >
      <Box>
        <AccessibleLink href="/">
          <Button size="md" width="100%" variant="ghost" colorScheme="gray">
            Modu
          </Button>
        </AccessibleLink>
      </Box>
      <Box
        display={{ base: 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <MenuStack direction="row" />
      </Box>
    </Flex>
  )
}

export default TopBar
