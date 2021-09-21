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
import { getTokenAddress } from "utils/helpers";

const VaultForm = ({ onClose, tokenSymbol, vaultAddress }) => {
  console.log("🚀 ~ VaultForm ~ vaultAddress", vaultAddress);
  const { account, onConnectToMetaMask, provider } = useWallet();
  const [userBalance, setUserBalance] = useState("0");
  const [tokenName, setTokenName] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [userPosition, setUserPosition] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const [inputText, setInputText] = useState("0");
  const [tokenDecimals, setTokenDecimals] = useState(0);

  const [tokenContract, setTokenContract] = useState<ethers.Contract>();
  const [vaultContract, setVaultContract] = useState<ethers.Contract>();

  const isConnected = Boolean(account);

  const { depositErc20, withdraw, approve } = useRibbon();
  const tokenAddress = getTokenAddress(tokenSymbol);
  console.log("🚀 ~ VaultForm ~ tokenAddress", tokenAddress);

  useEffect(() => {
    console.log(Boolean(provider));
    if (!provider) return;
    const c = new ethers.Contract(tokenAddress, erc20abi, provider);
    setTokenContract(c);
  }, [provider, tokenAddress]);

  useEffect(() => {
    if (!provider) return;
    const c = new ethers.Contract(vaultAddress, thetaVaultAbi, provider);
    setVaultContract(c);
  }, [provider, tokenAddress, vaultAddress]);

  // TODO: Probably shouldn't return here
  useAsyncEffect(async () => {
    if (!tokenContract || !vaultContract) {
      return;
    }
    setTokenDecimals(await tokenContract.decimals());
    const balance = await tokenContract.balanceOf(account);
    const position = await vaultContract
      .balanceOf(account)
      .then((res) => console.log(res))
      .catch((err) => console.warn(err));
    const approved = await tokenContract.allowance(account, vaultAddress);
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
              !isConnected
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
            {isConnected ? buttonText : "Connect Wallet"}
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
