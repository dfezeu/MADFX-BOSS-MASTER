// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BotToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol, uint256 initialSupply, address owner) ERC20(name, symbol) {
        _mint(owner, initialSupply);
        transferOwnership(owner);
    }
}

contract BotTokenFactory {
    event TokenCreated(address indexed tokenAddress, string name, string symbol, uint256 initialSupply, address owner);

    function createToken(string memory name, string memory symbol, uint256 initialSupply) external returns (address) {
        BotToken newToken = new BotToken(name, symbol, initialSupply, msg.sender);
        emit TokenCreated(address(newToken), name, symbol, initialSupply, msg.sender);
        return address(newToken);
    }
}