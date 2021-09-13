import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  align?: "left" | "right";
  flex?: number;
  title: string;
}

const Header = ({ align = "left", flex = 1, title }: Props) => {
  const justifyContent = align === "left" ? "flex-start" : "flex-end";

  return (
    <Box
      alignItems="center"
      cursor="pointer"
      display="flex"
      flex={flex}
      style={{ justifyContent }}
    >
      <Text>{title}</Text>
    </Box>
  );
};

export default Header;
