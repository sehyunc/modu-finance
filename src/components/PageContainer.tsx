import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";
import { Box, Flex, FlexProps, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

const Container = (props: FlexProps) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      {...props}
    />
  );
};

export type PageContainerProps = PropsWithChildren<FlexProps>;

export const PageContainer = ({ children, ...props }: PageContainerProps) => {
  const bgColor = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("black", "white");
  const router = useRouter();

  return (
    <Box bg={bgColor} color={color}>
      <Container minH="100vh" maxWidth="72rem" mx="auto" {...props}>
        {router.pathname === "/" ? <LandingNavbar /> : null}
        <Container px={8} flexDirection="row" alignItems="start">
          {children}
        </Container>
        <Footer />
      </Container>
    </Box>
  );
};
