import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useApprove, useRibbon } from "hooks/index";
import erc20abi from "../constants/abi/erc20.json";
import thetaVaultAbi from "../constants/abi/ribbonthetavault.json";
import { ethers } from "ethers";
import { roundOffBigInt } from "utils/helpers";
import useWallet from "contexts/wallet/useWallet";
import useAsyncEffect from "use-async-effect";

export const VaultForm = ({
  onClose,
  provider,
  tokenAddress,
  vaultAddress,
}) => {
  const { account, onConnectToMetaMask } = useWallet();
  const [userBalance, setUserBalance] = useState("0");
  const [tokenName, setTokenName] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [userPosition, setUserPosition] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const [inputText, setInputText] = useState("0");
  const [tokenDecimals, setTokenDecimals] = useState(0);

  const { depositErc20, withdraw, approve } = useRibbon(provider);

  const tokenContract = new ethers.Contract(tokenAddress, erc20abi, provider);
  const vaultContract = new ethers.Contract(
    vaultAddress,
    thetaVaultAbi,
    provider
  );

  useAsyncEffect(async () => {
    setTokenDecimals(await tokenContract.decimals());
    const balance = await tokenContract.balanceOf(account);
    const position = await vaultContract.balanceOf(account);
    const approved = await tokenContract.allowance(account, vaultAddress);
    console.log("balance :", balance);
    // if(tokenDecimals!=0){
    setTokenName(await tokenContract.name());
    setUserBalance(roundOffBigInt(balance, tokenDecimals));
    setUserPosition(roundOffBigInt(position, tokenDecimals));
    setIsApproved(BigInt(balance) > approved);
    // }
  }, [
    tokenAddress,
    provider,
    tokenDecimals,
    userBalance,
    userPosition,
    vaultAddress,
    account,
    tokenContract,
    vaultContract,
  ]);

  console.log("userBalance", userBalance);
  const buttonText = !isDeposit
    ? `Withdraw ${tokenName}`
    : isApproved
    ? `Deposit ${tokenName}`
    : `Approve ${tokenName}`;
  const footerText = isDeposit
    ? `Wallet Balance: ${userBalance} ${tokenName}`
    : `Your Position: ${userPosition} ${tokenName}`;

  const closeAndConnect = () => {
    onClose();
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
              setIsDeposit(true);
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
          <InputGroup>
            <Input
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              mb="12"
              variant="filled"
              placeholder="0"
              size="lg"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  if (isDeposit) {
                    setInputText(userBalance);
                  } else {
                    setInputText(userPosition);
                  }
                }}
              >
                Max
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            size="lg"
            w="100%"
            mb="6"
            onClick={
              !onConnectToMetaMask
                ? closeAndConnect
                : async () => {
                    if (!isApproved) {
                      await approve();
                    } else if (isDeposit) {
                      await depositErc20(+inputText, tokenDecimals);
                    } else {
                      await withdraw(+inputText, tokenDecimals);
                    }
                  }
            }
          >
            {onConnectToMetaMask ? buttonText : "Connect Wallet"}
          </Button>
          <Text textAlign="center" color="white">
            {footerText}
          </Text>
        </Box>
      </Box>
    </>
  );
};
