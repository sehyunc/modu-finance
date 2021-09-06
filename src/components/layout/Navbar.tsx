import AccessibleLink from "components/AccessibleLink";
import {useOnboard} from "hooks/useOnboard";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import AccountModal from "components/AccountModal";

const Links = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Fontis",
    href: "/fontis",
  },
  {
    label: "Ribbon",
    href: "/ribbon",
  },
];

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <Box px="2" py="1">
    <AccessibleLink href={href} isExternal={false} decoration={false}>
      {children}
    </AccessibleLink>
  </Box>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { connectWallet, address, wallet, onboard } = useOnboard();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "#000000")}
        px={4}
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            {/* <Box><ChakraNextImage src="/static/logo-white.png" alt="logo" width={{base: '48px'}} height={{base: '48px'}}/></Box> */}
            <NavLink href="/">Opyn</NavLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ label, href }) => (
                <NavLink key={href} href={href}>
                  <Text
                    fontWeight="500"
                    opacity={router.pathname === href ? 1 : 0.6}
                    _hover={{ opacity: "1" }}
                  >
                    {label}
                  </Text>
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {address ? (
              <AccountModal />
            ) : (
              <Button
                onClick={connectWallet}
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
              >
                Connect Wallet
              </Button>
            )}
            {/* <Menu>
              <MenuButton
                as={IconButton}
                // variant={'link'}
                cursor={"pointer"}
                icon={<HamburgerIcon />}
              />
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
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
        w="100%"
        h="2px"
        bgGradient="linear(to-r, #f4b04a, #d15c6c)"
        opacity="0.5"
        position="fixed"
        zIndex="10"
      />
    </>
  );
}
