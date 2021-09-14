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
