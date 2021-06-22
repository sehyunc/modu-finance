import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import AccessibleLink from "@/components/AccessibleLink";

const Links = [
  "Your Vaults",
  "Leaderboard",
  "Fontis",
  "Ribbon",
  "Opeth",
  "Optional",
];

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <Box px="2" py="1">
    <AccessibleLink href={`/${href}`} isExternal={false} decoration={false}>
      {children}
    </AccessibleLink>
  </Box>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "#000000")}
        px={4}
        position="sticky"
        top="0"
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
            <Box>Opyn</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link} href={link.toLowerCase()}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4}>
              Connect Wallet
            </Button>
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
              {Links.map((link) => (
                <NavLink key={link} href={link.toLowerCase()}>
                  {link}
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
      />
    </>
  );
}
