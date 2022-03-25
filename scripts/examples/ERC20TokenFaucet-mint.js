// Script to deploy an ERC20 token for testing purposes
const hre = require("hardhat");
const { parseUnits } = require('@ethersproject/units');

async function main() {

    const erc20TokenFaucetAddress = "0xf4c5641d5576f5Ef3343EdDb79439A39Ac08499C"

    const [acc1, acc2, acc3] = await ethers.getSigners();
    const caller = acc1;

    // Check that the ERC20 token address is provided
    if (erc20TokenFaucetAddress === "" || erc20TokenFaucetAddress === undefined) {
      console.log("Please specify a faucet address")
    }

    // Connect to ERC20TokenFaucet contract
    const erc20Faucet = await hre.ethers.getContractAt("ERC20TokenFaucet", erc20TokenFaucetAddress);
    
    // Print old supply
    console.log("Old supply: " + await erc20Faucet.totalSupply())
    
    const tx = await erc20Faucet.connect(caller).mint()
    await tx.wait()

    // Print new supply
    console.log("New supply: " + await erc20Faucet.totalSupply())
    console.log("User balance: " + await erc20Faucet.balanceOf(caller.address))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
