import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Vault } from "models/Vault";

interface Props {
  vault: Vault;
}

const Row = ({ vault }: Props) => {
  return (
    <>
      <Box
        alignItems="center"
        borderBottom="1px solid #000"
        display="flex"
        height="72px"
      >
        <Box alignItems="center" display="flex" flex={3} justifyContent="left">
          <Text>{vault.name}</Text>
        </Box>
        <Box alignItems="center" display="flex" flex={1} justifyContent="left">
          <Text>{vault.platform}</Text>
        </Box>
        <Box alignItems="center" display="flex" flex={1} justifyContent="left">
          <Text>{vault.symbol}</Text>
        </Box>
        <Box alignItems="center" display="flex" flex={1} justifyContent="left">
          <Text></Text>
        </Box>
      </Box>
    </>
  );
};

export default Row;
