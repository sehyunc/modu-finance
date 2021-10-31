// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import hre from 'hardhat'
import { ETH_ADDRESS } from "../utils/constants";
import SDETHCALL_ABI from "../utils/abi/stakeDAO_eth_call.json";
import {impersonateTransferFrom} from "../utils/testUtils";

async function main() {
  const Greeter = await hre.ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')

  await greeter.deployed()

  console.log('Greeter deployed to:', greeter.address)
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
