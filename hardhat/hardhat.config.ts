import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'dotenv/config'
import { HardhatNetworkUserConfig } from 'hardhat/types'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@tenderly/hardhat-tenderly'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      gasPrice: 'auto',
      forking: {
        url: 'https://speedy-nodes-nyc.moralis.io/8d4672da1ad48c865fd49fde/eth/mainnet/archive', // <---- YOUR INFURA ID! (or it won't work)
        blockNumber: 13703696,
      },
    },
    mainnet: {
      url: 'https://speedy-nodes-nyc.moralis.io/8d4672da1ad48c865fd49fde/eth/mainnet/archive', // <---- YOUR INFURA ID! (or it won't work)
      forking: {
        url: 'https://speedy-nodes-nyc.moralis.io/8d4672da1ad48c865fd49fde/eth/mainnet/archive', // <---- YOUR INFURA ID! (or it won't work)
        blockNumber: 13703696,
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
    trader: 1,
    hacker: 2,
    weth_faucet: 9,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
}

export default config;
