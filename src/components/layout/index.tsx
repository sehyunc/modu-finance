import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";

import Meta from "./Meta";
import Navbar from "./Navbar";
import VaultDrawer from "./VaultDrawer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Meta />
      <Navbar />
      <VaultDrawer />
      <Box as="main">{children}</Box>
    </Box>
  );
};

export default Layout;
