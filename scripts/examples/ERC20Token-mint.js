// Script to deploy an ERC20 token for testing purposes
const hre = require("hardhat");
const { parseUnits } = require('@ethersproject/units');

async function main() {

    let mintSupply = "1000" // scaling to corresponding number of decimals is done below in the code
    const recipient = "0x9AdEFeb576dcF52F5220709c1B267d89d5208D78"    // faucet address
    const erc20TokenAddress = "0x916e81F6A2879e0Cb3662b02B740331c6C0D801a"

    const [acc1, acc2, acc3] = await ethers.getSigners();
    const caller = acc1;

    // Check that the ERC20 token address is provided
    if (erc20TokenAddress === "" || erc20TokenAddress === undefined) {
      console.log("Please specify a token address")
    }

    // Connect to ERC20 token contract
    const erc20 = await hre.ethers.getContractAt("ERC20Token", erc20TokenAddress);

    // Get required token data for further processing
    const owner = await erc20.owner();
    const decimals = await erc20.decimals();
    
    // Print old supply
    console.log("Old supply: " + await erc20.totalSupply())

    // Check whether signer is equal to owner of token contract
    if (caller.address != owner) {
      console.log("Caller is not the owner of the token contract (" + owner + ")")
    }
    
    const tx = await erc20.mint(recipient, parseUnits(mintSupply, decimals))
    await tx.wait() 

    // Print new supply
    console.log("New supply: " + await erc20.totalSupply())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
