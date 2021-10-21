import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ethers, providers } from 'ethers'

import erc20abi from 'constants/abi/erc20.json'

import useWallet from 'contexts/wallet/useWallet'

import useBalance from 'hooks/useBalance'
import usePosition from 'hooks/usePosition'
import useRibbon from 'hooks/useRibbon'

import {
  symbolToDecimalMap,
  symbolToAddressMap,
  roundOffBigNumber,
} from 'utils/helpers'

import SubmitButton from '../SubmitButton'

interface VaultFormProps {
  onClose: () => void
  tokenSymbol: string
  vaultAddress?: string
}

const VaultForm: React.FC<VaultFormProps> = ({
  onClose,
  tokenSymbol,
  vaultAddress = '',
}) => {
  let balanceReadable = '0'
  let positionReadable = '0'
  const position = usePosition(vaultAddress)
  const { depositErc20, withdraw, approve } = useRibbon(vaultAddress)
  const [isApproved, setIsApproved] = useState(true)
  const [isDeposit, setIsDeposit] = useState(true)
  const [inputText, setInputText] = useState<string>()
  const [tokenContract, setTokenContract] = useState<ethers.Contract>()
  const { account, provider } = useWallet()
  const tokenAddress = symbolToAddressMap[tokenSymbol]

  const balance = useBalance(tokenAddress)

  const tokenDecimals = symbolToDecimalMap[tokenSymbol]

  balanceReadable = roundOffBigNumber(balance!, tokenDecimals)
  positionReadable = roundOffBigNumber(position!, tokenDecimals)

  const handleFetchApproval = useCallback(async () => {
    if (!tokenContract) {
      return
    }
    const approved = await tokenContract.allowance(account, vaultAddress)
    const needsApproval = balance?.gt(approved)
    setIsApproved(!needsApproval)
  }, [account, balance, tokenContract, vaultAddress])

  const handleSetMax = useCallback(async () => {
    if (isDeposit) {
      setInputText(balanceReadable)
    } else {
      setInputText(positionReadable)
    }
  }, [balanceReadable, isDeposit, positionReadable])

  useEffect(() => {
    if (!provider) return
    const signer = provider.getSigner()
    const c = new ethers.Contract(tokenAddress, erc20abi, signer)
    setTokenContract(c)
  }, [provider, tokenAddress])

  useEffect(() => {
    handleFetchApproval()
  }, [handleFetchApproval])

  const footerText = isDeposit
    ? `Wallet Balance: ${balanceReadable} ${tokenSymbol}`
    : `Your Position: ${positionReadable} ${tokenSymbol}`

  const handleApprove = useCallback(() => {
    approve(vaultAddress, tokenContract!, balance!)
  }, [approve, balance, tokenContract, vaultAddress])

  const handleDeposit = useCallback(() => {
    depositErc20(Number(inputText), tokenDecimals)
    onClose()
  }, [depositErc20, inputText, onClose, tokenDecimals])

  const handleWithdraw = useCallback(() => {
    withdraw(Number(inputText), tokenDecimals)
    onClose()
  }, [inputText, onClose, tokenDecimals, withdraw])

  const ApproveButton = (
    <SubmitButton handleClick={handleApprove} text={`Approve ${tokenSymbol}`} />
  )
  const DepositButton = (
    <SubmitButton handleClick={handleDeposit} text={`Deposit ${tokenSymbol}`} />
  )

  const WithdrawButton = (
    <SubmitButton
      handleClick={handleWithdraw}
      text={`Withdraw ${tokenSymbol}`}
    />
  )

  const ActionButton = !isApproved
    ? ApproveButton
    : isDeposit
    ? DepositButton
    : WithdrawButton

  const Tabs = (
    <Flex>
      <Center
        bg={isDeposit ? '#1c1a19' : '#242322'}
        borderLeft="2px solid #242322"
        borderTop="2px solid #242322"
        borderTopLeftRadius="8px"
        minWidth="50%"
        py="5"
        onClick={() => {
          setIsDeposit(true)
        }}
        _hover={{
          cursor: 'pointer',
        }}
      >
        Deposit
      </Center>
      <Center
        bg={isDeposit ? '#242322' : '#1c1a19'}
        borderRight="2px solid #242322"
        borderTopRightRadius="8px"
        borderTop="2px solid #242322"
        onClick={() => setIsDeposit(false)}
        minWidth="50%"
        _hover={{
          cursor: 'pointer',
        }}
      >
        Withdraw
      </Center>
    </Flex>
  )

  return (
    <Box width="100%">
      {Tabs}
      <Stack
        bgColor="#1c1a19"
        border="2px solid #242322"
        borderBottomLeftRadius="8px"
        borderBottomRightRadius="8px"
        borderTopStyle="none"
        direction="column"
        p="6"
        spacing={6}
      >
        <div>
          <Text mb="1">{`Amount (${tokenSymbol})`}</Text>
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
        </div>
        {ActionButton}
        <Text textAlign="center">{footerText}</Text>
      </Stack>
    </Box>
  )
}

export default VaultForm
