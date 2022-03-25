// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IERC20TokenFaucet.sol";

/**
 * @notice ERC20 token faucet that allows anyone to mint
 * a fixed amount of ERC20 tokens. The same address cannot mint
 * more than once a day though. User has to own some eth
 * to pay for gas.
 */
contract ERC20TokenFaucet is ERC20, IERC20TokenFaucet {
    
    uint8 private _decimals = 18;
    uint256 public amountAllowed = 10000 * 10**_decimals; // 10'000   

    mapping(address => uint256) public lockTime; // 1 day waiting period

    constructor(
        string memory name_, 
        string memory symbol_,
        uint8 decimals_
    ) payable ERC20(name_, symbol_) {
        _decimals = decimals_;
    }

    function mint() external override {

        //perform a few checks to make sure function can execute
        require(block.timestamp > lockTime[msg.sender], "Faucet: Lock time has not expired. Please try again later.");

        // Updates locktime 1 day from now
        lockTime[msg.sender] = block.timestamp + 1 days;
        
        // If the balance of this contract is greater then the requested amount send funds
        _mint(msg.sender, amountAllowed);        
        
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

}
