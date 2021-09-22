import { useCallback, useEffect, useState } from "react";
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
import { ethers } from "ethers";

import erc20abi from "constants/abi/erc20.json";

import useWallet from "contexts/wallet/useWallet";

import useBalance from "hooks/useBalance";
import usePosition from "hooks/usePosition";
import useRibbon from "hooks/useRibbon";

import { symbolToDecimalMap, symbolToAddressMap } from "utils/helpers";

import SubmitButton from "../SubmitButton";

interface VaultFormProps {
  onClose: () => void;
  tokenSymbol: string;
  vaultAddress: string;
}

const VaultForm: React.FC<VaultFormProps> = ({
  onClose,
  tokenSymbol,
  vaultAddress,
}) => {
  const position = usePosition(vaultAddress);
  const { depositErc20, withdraw, approve } = useRibbon();
  const [isApproved, setIsApproved] = useState(true);
  const [isDeposit, setIsDeposit] = useState(true);
  const [inputText, setInputText] = useState<string>();
  const [tokenContract, setTokenContract] = useState<ethers.Contract>();
  const { account, provider } = useWallet();

  const tokenAddress = symbolToAddressMap[tokenSymbol];

  const balance = useBalance(tokenAddress);

  const tokenDecimals = symbolToDecimalMap[tokenSymbol];

  const handleFetchApproval = useCallback(async () => {
    if (!tokenContract) {
      return;
    }
    const approved = await tokenContract.allowance(account, vaultAddress);
    const needsApproval = balance?.gt(approved);
    setIsApproved(!!needsApproval);
  }, [account, balance, tokenContract, vaultAddress]);

  const handleSetMax = useCallback(async () => {
    if (isDeposit) {
      setInputText(balance?.toString());
    } else {
      setInputText(position?.toString());
    }
  }, [balance, isDeposit, position]);

  useEffect(() => {
    if (!provider) return;
    const c = new ethers.Contract(tokenAddress, erc20abi, provider);
    setTokenContract(c);
  }, [provider, tokenAddress]);

  useEffect(() => {
    handleFetchApproval();
  }, [handleFetchApproval]);

  const footerText = isDeposit
    ? `Wallet Balance: ${balance} ${tokenSymbol}`
    : `Your Position: ${position} ${tokenSymbol}`;

  const handleApprove = useCallback(() => {
    approve();
  }, [approve]);

  const handleDeposit = useCallback(() => {
    depositErc20(Number(inputText), tokenDecimals);
    onClose();
  }, [depositErc20, inputText, onClose, tokenDecimals]);

  const handleWithdraw = useCallback(() => {
    withdraw(Number(inputText), tokenDecimals);
    onClose();
  }, [inputText, onClose, tokenDecimals, withdraw]);

  const ApproveButton = (
    <SubmitButton handleClick={handleApprove} text={`Approve ${tokenSymbol}`} />
  );
  const DepositButton = (
    <SubmitButton handleClick={handleDeposit} text={`Deposit ${tokenSymbol}`} />
  );

  const WithdrawButton = (
    <SubmitButton
      handleClick={handleWithdraw}
      text={`Withdraw ${tokenSymbol}`}
    />
  );

  const ActionButton = !isApproved
    ? ApproveButton
    : isDeposit
    ? DepositButton
    : WithdrawButton;

  const Tabs = (
    <>
      <Center
        bg={isDeposit ? "#1c1a19" : "#242322"}
        borderLeft="2px solid #242322"
        borderTop="2px solid #242322"
        borderTopLeftRadius="8px"
        minWidth="50%"
        py="5"
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
        bg={isDeposit ? "#242322" : "#1c1a19"}
        borderRight="2px solid #242322"
        borderTopRightRadius="8px"
        borderTop="2px solid #242322"
        onClick={() => setIsDeposit(false)}
        minWidth="50%"
        _hover={{
          cursor: "pointer",
        }}
      >
        Withdraw
      </Center>
    </>
  );

  return (
    <Box width="100%">
      <Flex>{Tabs}</Flex>
      <Box
        bgColor="#1c1a19"
        border="2px solid #242322"
        borderBottomLeftRadius="8px"
        borderBottomRightRadius="8px"
        borderTopStyle="none"
        p="6"
      >
        <Text>{`Amount (${tokenSymbol})`}</Text>
        <InputGroup>
          <Input
            onChange={(event) => setInputText(event.target.value)}
            placeholder="0"
            value={inputText}
            variant="filled"
          />
          <InputRightElement>
            <Button height="100%" onClick={handleSetMax} size="sm">
              Max
            </Button>
          </InputRightElement>
        </InputGroup>
        {ActionButton}
        <Text textAlign="center">{footerText}</Text>
      </Box>
    </Box>
  );
};

export default VaultForm;
