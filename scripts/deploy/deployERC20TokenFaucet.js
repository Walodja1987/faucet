// Script to deploy an ERC20 token for testing purposes

const hre = require("hardhat");
const args = require("./deployERC20TokenFaucet-args.js");

async function main() {

    // Set constructor args
    const name = args[0]        // "TUSDC"
    const symbol = args[1]      // "TUSDC"
    const decimals = args[2]    // 18

    // Set deployer account
    const [acc1, acc2, acc3] = await ethers.getSigners()
    const deployer = acc1;

    // Deploy ERC20TokenFaucet contract
    const ERC20Faucet = await hre.ethers.getContractFactory("ERC20TokenFaucet");
    const erc20Faucet = await ERC20Faucet.connect(deployer).deploy(name, symbol, decimals);

    await erc20Faucet.deployed();

    // Print token information
    console.log("Deployer address :" + deployer.address)
    console.log("ERC20 token deployed to: ", erc20Faucet.address);
    console.log("Name: " + await erc20Faucet.name())
    console.log("Symbol: " + await erc20Faucet.symbol())
    console.log("Decimals: " + await erc20Faucet.decimals())
    console.log("Initial supply: " + await erc20Faucet.totalSupply())

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
