// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const SDETHCALL_ABI = require("../utils/abi/stakeDAO_eth_call.json");
const { ETH_ADDRESS } = require("../utils/constants.ts");
const {impersonateTransferFrom} = require("../utils/testUtils.ts")
async function main() {

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
  const [signer] = await ethers.getSigners()

  await impersonateTransferFrom("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8", signer.address, 1e18);
  
  // console.log(signer)
  const sdEthCall = new ethers.Contract("0x839A989bE40f2D60f00beEB648903732c041CBd7", SDETHCALL_ABI, signer)
  const response = await sdEthCall.name();
  console.log(response, SDETHCALL_ABI)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
