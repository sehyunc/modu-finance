import { expect } from 'chai';
import { ethers } from 'hardhat';
import ETH_CALL from "../utils/abi/stakeDAO_eth_call.json";
import {ETH_ADDRESS, ETH_SD_ETH_CALL} from "../utils/constants";
import { impersonateTransferFrom } from '../utils/testUtils';
import SDETHCALL_ABI from "../utils/abi/stakeDAO_eth_call.json";
describe("StakeDAO tests", async () => {

  const [signer] = await ethers.getSigners()

  await impersonateTransferFrom(
    ETH_ADDRESS,
    '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
    signer.address,
    1e18
  )

  // console.log(signer)
  const sdEthCall = new ethers.Contract(
    '0x839A989bE40f2D60f00beEB648903732c041CBd7',
    SDETHCALL_ABI,
    signer
  )
  const response = await sdEthCall.name()
  console.log(response, SDETHCALL_ABI)
})