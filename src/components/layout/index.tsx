import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { useRouter } from "next/router";

import Meta from "./Meta";
import Navbar from "./Navbar";
import { ethers } from "ethers";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const provider = new ethers.getDefaultProvider(
    "wss://kovan.infura.io/ws/v3/6462ee1e07a545188f9d444247d3a9e1"
  );
  const router = useRouter();
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Meta />
      {router.pathname !== "/" ? <Navbar /> : null}
      <Box as="main">{children}</Box>
    </Box>
  );
};

export default Layout;
