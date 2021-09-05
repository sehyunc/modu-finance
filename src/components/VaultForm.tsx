import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useOnboard, useRibbon} from "@/hooks/index";
import erc20abi from "../constants/abi/erc20.json"
import thetaVaultAbi from "../constants/abi/ribbonthetavault.json"
import { ethers } from "ethers";
import { roundOffBigInt } from "@/utils/helpers";
export const VaultForm = ({ onClose, provider, tokenAddress, vaultAddress}) => {
  const [userBalance, setUserBalance] = useState('0');
  const [tokenName, setTokenName] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const { address, connectWallet, isWalletConnected } = useOnboard();
  const [isDeposit, setIsDeposit] = useState(true);
  const {depositErc20} = useRibbon();
  const tokenContract = new ethers.Contract(tokenAddress, erc20abi, provider)
  const vaultContract = new ethers.Contract(vaultAddress, thetaVaultAbi, provider)

  useEffect( async () => {

    const tokenDecimals = await tokenContract.decimals()
    setTokenName(await tokenContract.name())
    const balance = await tokenContract.balanceOf(address)
    const position = await vaultContract.balanceOf(address)
    setUserBalance(roundOffBigInt(balance, tokenDecimals))
    setUserPosition(roundOffBigInt(position, tokenDecimals))

  }, [tokenAddress, address, provider])

  console.log("userBalance", userBalance)
  const buttonText = isDeposit ? `Deposit ${tokenName}` : `Withdraw ${tokenName}`;
  const footerText = isDeposit
    ? `Wallet Balance: ${userBalance} ${tokenName}`
    : `Your Position: ${userPosition} ${tokenName}`;

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
            onClick={() => {
              setIsDeposit(true)
            }}
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
            Amount ({tokenName})
          </Text>
          {/* text input */}
          <Input mb="12" variant="filled" placeholder="0" size="lg" />
          <Button
            size="lg"
            w="100%"
            mb="6"
            onClick={!isWalletConnected ? closeAndConnect : async () => { 
              if(isDeposit){
                await depositErc20(1,8)
              }
            }}
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

