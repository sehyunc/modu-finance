import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { ethers } from 'ethers'

import erc20abi from 'constants/abi/erc20.json'

import useWallet from 'contexts/wallet/useWallet'

import useBalance from 'hooks/useBalance'
import usePosition from 'hooks/usePosition'
import useRibbon from 'hooks/useRibbon'

import { Platform } from 'models/Vault'

import {
  symbolToDecimalMap,
  symbolToAddressMap,
  roundOffBigNumber,
} from 'utils/helpers'

import SubmitButton from '../SubmitButton'
import { STAKEDAO_VAULT_ADDRESSES } from 'constants/addresses'
import useRibbonV2 from 'hooks/useRibbonV2'
import { useStakeDAO } from 'hooks/useStakeDAO'

interface VaultFormProps {
  onClose: () => void
  tokenSymbol: string
  vaultAddress?: string
  platform: string
  uuid: string
}

const depositTokens = ['FRAX', 'DAI', 'USDC', 'USDT', 'FRAX3CRV-f']
const withdrawTokens = ['FRAX', 'FRAX3CRV-f']

const ETH_PUT_tokens = ['FRAX', 'DAI', 'USDC', 'USDT', 'FRAX3CRV-f']
const BTC_CALL_tokens = ['WBTC', 'crvRenWSBTC']
const VaultForm: React.FC<VaultFormProps> = ({
  onClose,
  tokenSymbol,
  vaultAddress = '',
  platform,
  uuid,
}) => {
  let tokens: string[] = []
  if (vaultAddress === '') vaultAddress = uuid.split('_')[1]
  const position = usePosition(vaultAddress)
  const { depositErc20, depositETH, withdraw, approve } = useRibbonV2(vaultAddress)
  const {depositErc20SD, depositETHSD, withdrawSD} = useStakeDAO(vaultAddress)
  const [isApproved, setIsApproved] = useState(true)
  const [isDeposit, setIsDeposit] = useState(true)
  const [inputText, setInputText] = useState<string>()
  const [stakeDaoToken, setStakeDaoToken] = useState('')
  const [tokenContract, setTokenContract] = useState<ethers.Contract>()
  const { account, provider } = useWallet()
  
  console.log("🚀 ~ file: VaultForm.tsx ~ line 55 ~ vaultAddress", vaultAddress)
  const underlyingSymbol =
    platform === Platform.STAKEDAO ? stakeDaoToken : tokenSymbol

  const tokenAddress = symbolToAddressMap[tokenSymbol] // modify this for stakedao token

  if (platform === Platform.STAKEDAO) {
    switch (uuid.split('_')[1]) {
      case STAKEDAO_VAULT_ADDRESSES['ETH_PUT']:
        tokens = ETH_PUT_tokens
        break
      case STAKEDAO_VAULT_ADDRESSES['BTC_CALL']:
        tokens = BTC_CALL_tokens
        break
      default:
        tokens = ['ETH']
    }
  }
  const balance = useBalance(tokenAddress)

  const tokenDecimals = symbolToDecimalMap[tokenSymbol] // modify this for stakedao token

  const balanceReadable = roundOffBigNumber(balance!, tokenDecimals)
  const positionReadable = roundOffBigNumber(position!, tokenDecimals)

  const handleApprove = useCallback(() => {
    approve(vaultAddress, tokenContract!, balance!)
  }, [approve, balance, tokenContract, vaultAddress])

  const handleDeposit = useCallback(() => {
    const signer = provider?.getSigner()
    if (platform === Platform.STAKEDAO) {
      depositErc20SD(
        Number(inputText),
        tokenDecimals,
        signer,
        uuid,
        tokens.indexOf(stakeDaoToken)
      )
    } else {
      depositErc20(Number(inputText), tokenDecimals, signer, uuid)
    }
    onClose()
  }, [depositErc20, depositErc20SD, inputText, onClose, platform, provider, stakeDaoToken, tokenDecimals, tokens, uuid])

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

  const handleWithdraw = useCallback(() => {
    const signer = provider?.getSigner()
    if (platform === Platform.STAKEDAO) {
      withdrawSD(
        Number(inputText),
        tokenDecimals,
      )
    } else {
      withdraw(Number(inputText), tokenDecimals)
    }

    onClose()
  }, [inputText, onClose, platform, provider, tokenDecimals, withdraw, withdrawSD])

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
    ? `Wallet Balance: ${balanceReadable} ${underlyingSymbol}`
    : `Your Position: ${positionReadable} ${underlyingSymbol}`

  const ApproveButton = (
    <SubmitButton
      handleClick={handleApprove}
      text={`Approve ${underlyingSymbol}`}
    />
  )

  const DepositButton = (
    <SubmitButton
      handleClick={handleDeposit}
      text={`Deposit ${underlyingSymbol}`}
    />
  )

  const WithdrawButton = (
    <SubmitButton
      handleClick={handleWithdraw}
      text={`Withdraw ${underlyingSymbol}`}
    />
  )

  const ActionButton = !isApproved
    ? ApproveButton
    : isDeposit
    ? DepositButton
    : WithdrawButton
  tokens = isDeposit ? depositTokens : withdrawTokens

  const StakeDaoTokenSelect = (
    <Box alignItems="center" display="flex">
      <Text flex={1}>Select Input</Text>
      {platform === Platform.STAKEDAO ? (
        <Box flex={1} width="100%">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              width="100%"
            >
              {stakeDaoToken || 'Select Token'}
            </MenuButton>
            <MenuList>
              {tokens.map((t, i) => (
                <MenuItem key={i} onClick={() => setStakeDaoToken(t)} value={t}>
                  {t}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      ) : null}
    </Box>
  )

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
    <Box style={{ fontWeight: 'bold' }} width="100%">
      {Tabs}
      <Stack
        bgColor="#1c1a19"
        border="2px solid #242322"
        borderBottomLeftRadius="8px"
        borderBottomRightRadius="8px"
        borderTopStyle="none"
        direction="column"
        p={6}
        spacing={6}
      >
        <div>
          {underlyingSymbol != '' ? (
            <Text mb="1">{`Amount (${underlyingSymbol})`}</Text>
          ) : (
            <Text mb="1">Amount</Text>
          )}
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
        {StakeDaoTokenSelect}
        {ActionButton}
        <Text textAlign="center">{footerText}</Text>
      </Stack>
    </Box>
  )
}

export default VaultForm
