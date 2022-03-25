require("@nomiclabs/hardhat-waffle");     // yarn add --dev @nomiclabs/hardhat-waffle
require("dotenv").config();               // yarn add --dev dotenv
require("hardhat-gas-reporter");          // yarn add --dev hardhat-gas-reporter
require('hardhat-contract-sizer');        // yarn add --dev hardhat-contract-sizer
require("xdeployer");                     // yarn add --dev xdeployer @nomiclabs/hardhat-ethers @openzeppelin/contracts
require("@nomiclabs/hardhat-etherscan");  // yarn add --dev @nomiclabs/hardhat-etherscan

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

const PRIVATE_KEY = process.env.PRIVATE_KEY
const MNEMONIC = process.env.MNEMONIC

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.13",
  networks: {
    hardhat: {
        forking: {
            url: process.env.ALCHEMY_URL_MAINNET,
        },
        gas: "auto"
    },
    ropsten: {
      url: process.env.ALCHEMY_URL_ROPSTEN,
      accounts: {
        mnemonic: MNEMONIC, // example with mnemonic; type: object
      },
      // accounts: [`0x${PRIVATE_KEY}`], // example with private key; type: array
    },
    rinkeby: {
      url: process.env.ALCHEMY_URL_RINKEBY,
      accounts: {
        mnemonic: MNEMONIC, // example with mnemonic; type: object
      },
    },
    kovan: {
      url: process.env.ALCHEMY_URL_KOVAN,
      accounts: {
        mnemonic: MNEMONIC,
      }
    },
    mumbai: {
      url: process.env.ALCHEMY_URL_POLYGON_MUMBAI,
      accounts: {
        mnemonic: MNEMONIC, 
      },
      gasPrice: 8000000000,
    },
    polygon: {
      url: process.env.ALCHEMY_URL_POLYGON_MAINNET,
      accounts: {
        mnemonic: MNEMONIC, 
      },
      gasLimit: 3000000,
      gasPrice: 50000000000,
    },
    arbitrumTestnet: {
      url: process.env.ALCHEMY_URL_ARBITRUM_RINKEBY,
      accounts: {
        mnemonic: MNEMONIC, 
      }
    },
  },
  gasReporter:{
      currency: "USD",
      gasPrice: 20,
      enabled: true,
  },
  xdeploy: {
    // contract: "ERC20Token",
    // constructorArgsPath: "./scripts/deploy/deployERC20Token-args.js",
    // salt: "WAGMIERC20Test1",  // update everytime you do a new deployment
    contract: "ERC20TokenFaucet",
    constructorArgsPath: "./scripts/deploy/deployERC20TokenFaucet-args.js",
    salt: "WAGMIERC20FaucetTest2",  // update everytime you do a new deployment
    signer: PRIVATE_KEY,
    networks: [
      "ropsten", 
      "rinkeby", 
      "kovan", 
      "mumbai"
    ],
    rpcUrls: [
      process.env.ALCHEMY_URL_ROPSTEN, 
      process.env.ALCHEMY_URL_RINKEBY, 
      process.env.ALCHEMY_URL_KOVAN, 
      process.env.ALCHEMY_URL_POLYGON_MUMBAI
    ],
    gasLimit: 4 * 10 ** 6,
  },
  etherscan: {
    apiKey: {
      ropsten: process.env.ETHERSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
      kovan: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.POLYGON_API_KEY,
      // polygon: process.env.POLYGON_API_KEY
    }
  }
};
