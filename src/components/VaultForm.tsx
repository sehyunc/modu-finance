import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import useOnboard from "@/hooks/useOnboard";

const VaultForm = ({ onClose, provider, tokenAddress  }) => {
  const { connectWallet, isWalletConnected } = useOnboard();
  const [isDeposit, setIsDeposit] = useState(true);
  const buttonText = isDeposit ? "Deposit ETH" : "Withdraw ETH";
  const footerText = isDeposit
    ? "Wallet Balance: x ETH"
    : "Your Position: x ETH";

  const closeAndConnect = () => {
    onClose();
    connectWallet();
  };

  return (
    <>
      <Box>
        <Flex>
          <Center
            minW="50%"
            borderTopLeftRadius="8px"
            borderTop="2px solid #242322"
            borderLeft="2px solid #242322"
            bg={isDeposit ? "#1c1a19" : "#242322"}
            py="5"
            color="white"
            onClick={() => setIsDeposit(true)}
            _hover={{
              cursor: "pointer",
            }}
          >
            Deposit
          </Center>
          <Center
            minW="50%"
            borderTopRightRadius="8px"
            borderTop="2px solid #242322"
            borderRight="2px solid #242322"
            bg={isDeposit ? "#242322" : "#1c1a19"}
            py="5"
            color="white"
            onClick={() => setIsDeposit(false)}
            _hover={{
              cursor: "pointer",
            }}
          >
            Withdraw
          </Center>
        </Flex>
        <Box
          borderBottomLeftRadius="8px"
          borderBottomRightRadius="8px"
          border="2px solid #242322"
          p="6"
          bgColor="#1c1a19"
          borderTopStyle="none"
        >
          <Text color="white" mb="3">
            Amount (ETH)
          </Text>
          <Input mb="12" variant="filled" placeholder="0" size="lg" />
          <Button
            size="lg"
            w="100%"
            mb="6"
            onClick={!isWalletConnected ? closeAndConnect : () => { console.log("empty function")}}
          >
            {isWalletConnected ? buttonText : "Connect Wallet"}
          </Button>
          <Text textAlign="center" color="white">
            {footerText}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default VaultForm;
