import AccessibleLink from "@/components/AccessibleLink";
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
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiFillGithub } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label={`Toggle ${colorMode} mode`}
      variant="ghost"
      fontSize="xl"
      onClick={toggleColorMode}
      icon={<CgDarkMode />}
    />
  );
};

export const Logo = () => {
  return (
    <AccessibleLink href="/">
      <Button size="md" width="100%" variant="ghost" colorScheme="gray">
        Opyn Vault Aggregator
      </Button>
    </AccessibleLink>
  );
};

interface NavbarContainerProps {
  children: ReactNode;
}

const NavbarContainer = ({ children, ...props }: NavbarContainerProps) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      {...props}
    >
      {children}
    </Flex>
  );
};

interface MenuItemProps {
  children: ReactNode;
  to: string;
}

export const MenuItem = ({
  children,
  to = "/",
  ...props
}: MenuItemProps & ButtonProps) => {
  return (
    <AccessibleLink href={to} isExternal={true}>
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
  );
};

export const MenuStack = (props: StackProps) => (
  <Stack
    spacing={{ base: 0, md: 4 }}
    align="center"
    justify="flex-end"
    {...props}
  >
    <HStack pb={{ base: 4, md: 0 }}>
      <MenuItem to="/dashboard">Enter App</MenuItem>
    </HStack>
    <HStack>
      <DarkModeSwitch />
      <Link href="https://github.com/sehyunc/opyn-vault-aggregator" isExternal>
        <IconButton
          aria-label="Link to GitHub"
          variant="ghost"
          fontSize="xl"
          icon={<AiFillGithub />}
        />
      </Link>
    </HStack>
  </Stack>
);

const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <Logo />
        <Box
          display={{ base: "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <MenuStack direction="row" />
        </Box>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
