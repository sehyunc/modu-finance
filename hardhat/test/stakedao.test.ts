import { expect } from 'chai';
import { ethers } from 'hardhat';
import ETH_CALL from "../utils/abi/stakeDAO_eth_call.json";
import {ETH_SD_ETH_CALL} from "../utils/constants";

describe("StakeDAO tests", async () => {
    const sdEthCallContract = new ethers.Contract(ETH_SD_ETH_CALL, ETH_CALL)
    console.log(await sdEthCallContract.cap());
})