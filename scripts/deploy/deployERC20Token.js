// Script to deploy an ERC20 token for testing purposes

const hre = require("hardhat");
const args = require("./deployERC20Token-args.js");

async function main() {

    // Set constructor args
    const name = args[0]        // "TUSDC"
    const symbol = args[1]      // "TUSDC"
    const decimals = args[2]    // 18

    // Set deployer account
    const [acc1, acc2, acc3] = await ethers.getSigners()
    const deployer = acc1;

    // Deploy ERC20Token contract
    const ERC20 = await hre.ethers.getContractFactory("ERC20Token");
    const erc20 = await ERC20.connect(deployer).deploy(name, symbol, decimals);

    await erc20.deployed();

    // Print token information
    console.log("Deployer address :" + deployer.address)
    console.log("ERC20 token deployed to: ", erc20.address);
    console.log("Name: " + await erc20.name())
    console.log("Symbol: " + await erc20.symbol())
    console.log("Decimals: " + await erc20.decimals())
    console.log("Initial supply: " + await erc20.totalSupply())
    console.log("Owner: " + await erc20.owner())

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
