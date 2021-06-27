import { Box, Flex, FlexProps, useColorModeValue } from "@chakra-ui/react";
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
  const bgColor = useColorModeValue("white", "#000000");
  const color = useColorModeValue("black", "white");

  return (
    <Box bg={bgColor} color={color}>
      <Container minHeight="100vh" maxWidth="72rem" mx="auto" {...props}>
        <Container px={8} flexDirection="row" alignItems="start">
          {children}
        </Container>
      </Container>
    </Box>
  );
};
