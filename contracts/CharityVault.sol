// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharityVault {
    address public owner;
    uint256 public totalDonations;

    struct Initiative {
        string name;
        uint256 goal;
        uint256 funded;
        bool active;
    }

    Initiative[] public initiatives;

    event DonationReceived(address indexed donor, uint256 amount);
    event InitiativeCreated(uint256 indexed id, string name, uint256 goal);
    event FundsAllocated(uint256 indexed id, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    function donate() external payable {
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function createInitiative(string memory name, uint256 goal) external onlyOwner {
        initiatives.push(Initiative(name, goal, 0, true));
        emit InitiativeCreated(initiatives.length - 1, name, goal);
    }

    function allocateFunds(uint256 id, uint256 amount) external onlyOwner {
        require(id < initiatives.length, "Invalid initiative");
        require(initiatives[id].active, "Initiative not active");
        require(amount <= address(this).balance, "Insufficient funds");
        initiatives[id].funded += amount;
        emit FundsAllocated(id, amount);
    }

    function getInitiatives() external view returns (Initiative[] memory) {
        return initiatives;
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(amount);
    }
}