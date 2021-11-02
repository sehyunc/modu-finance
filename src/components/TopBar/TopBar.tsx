import AccessibleLink from 'components/AccessibleLink'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import useWallet from 'contexts/wallet/useWallet'

import AccountModal from './components/AccountModal/AccountModal'
import WrongNetworkModal from './components/WrongNetworkModal'
const Links = [
  {
    label: 'Modu',
    href: '/',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Leaderboard',
    href: '/leaderboard',
  },
  // {
  //   label: 'Fontis',
  //   href: '/fontis',
  // },
  // {
  //   label: 'Ribbon',
  //   href: '/ribbon',
  // },
  // {
  //   label: 'StakeDAO',
  //   href: '/stakedao',
  // },
]

interface NavLinkProps {
  children: ReactNode
  href: string
}

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => (
  <Box px="2" py="1">
    <AccessibleLink href={href} decoration={false}>
      {children}
    </AccessibleLink>
  </Box>
)

const TopBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { account, needsSwitchNetwork, onConnectToMetaMask } = useWallet()

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', '#000000')}
        px={4}
        position="sticky"
        top="0"
        zIndex={10}
      >
        <Flex alignItems="center" h={16} justifyContent="space-between">
          <IconButton
            aria-label="Open Menu"
            display={{ md: 'none' }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            size="md"
          />
          <Box alignItems="center" display="flex">
            <HStack display={{ base: 'none', md: 'flex' }} spacing={4}>
              {Links.map(({ label, href }) => (
                <NavLink key={href} href={href}>
                  <Text
                    fontWeight="500"
                    opacity={router.pathname === href ? 1 : 0.6}
                    _hover={{ opacity: '1' }}
                  >
                    {label}
                  </Text>
                </NavLink>
              ))}
            </HStack>
          </Box>
          <Stack alignItems="center" direction="row" spacing={3}>
            {needsSwitchNetwork ? <WrongNetworkModal /> : null}
            {account ? (
              <AccountModal />
            ) : (
              <Button
                onClick={onConnectToMetaMask}
                variant="solid"
                colorScheme="teal"
                size="sm"
                mr={4}
              >
                Connect Wallet
              </Button>
            )}
          </Stack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ label, href }) => (
                <NavLink key={href} href={href}>
                  {label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box
        bgGradient="linear(to-r, #f4b04a, #d15c6c)"
        h="2px"
        opacity="0.5"
        position="fixed"
        w="100%"
        zIndex={10}
      />
    </>
  )
}

export default TopBar
