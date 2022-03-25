// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20TokenFaucet is IERC20 {
    /**
     * @dev Function to mint new tokens to `msg.sender`
     */
    function mint() external;

}
