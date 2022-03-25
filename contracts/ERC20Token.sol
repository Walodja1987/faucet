// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Token is Ownable, ERC20 {
    uint8 private _decimals;
    constructor(
        string memory name_, 
        string memory symbol_,
        uint8 decimals_
    ) payable ERC20(name_, symbol_) {
        _decimals = decimals_;
    }

    function mint(
        address _recipient, 
        uint256 _amount
    ) external onlyOwner {
        _mint(_recipient, _amount);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
