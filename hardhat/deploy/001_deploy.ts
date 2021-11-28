import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { impersonateTransferFrom } from '../utils/testUtils'
import {
  WBTC_ADDRESSS, 
  ETH_ADDRESS,
  WBTC_WHALE,
  WETH_ADDRESS,
} from '../utils/constants'
import { parseEther, parseUnits } from 'ethers/lib/utils'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

    await impersonateTransferFrom(
      WETH_ADDRESS,
      '0xf977814e90da44bfa03b6295a0616a897441acec',
      '0x1245e96fe32B43dDEc930D662B5d20239282b876',
      parseEther('100')
    )

    await impersonateTransferFrom(
      ETH_ADDRESS,
      '0xf977814e90da44bfa03b6295a0616a897441acec',
      '0x1245e96fe32B43dDEc930D662B5d20239282b876',
      parseEther('100')
    )

    await impersonateTransferFrom(
      WBTC_ADDRESSS,
      WBTC_WHALE,
      '0x1245e96fe32B43dDEc930D662B5d20239282b876',
      parseUnits("1",7)
    )
    await deploy('DummyContract', {
      from: deployer,
      log: true,
    })
}
export default func
func.tags = ['opyn-vault-aggregator']
