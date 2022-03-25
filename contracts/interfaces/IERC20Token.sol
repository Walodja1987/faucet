// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20Token is IERC20 {
    
    /**
     * @dev Function to mint `_amount` of tokens to `_recipient`
     * @param _recipient Recipient address
     * @param _amount Amount of tokens expressed as an integer in token decimals
     */
    function mint(address _recipient, uint256 _amount) external;

}
