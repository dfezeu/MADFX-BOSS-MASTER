// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SignalMirroring {
    struct Signal {
        address trader;
        string action; // "buy" or "sell"
        string symbol;
        uint256 amount;
        uint256 timestamp;
    }

    Signal[] public signals;
    mapping(address => address[]) public followers;

    event SignalCreated(uint256 indexed signalId, address indexed trader, string action, string symbol, uint256 amount);
    event FollowerAdded(address indexed trader, address indexed follower);

    function createSignal(string memory action, string memory symbol, uint256 amount) external {
        signals.push(Signal(msg.sender, action, symbol, amount, block.timestamp));
        emit SignalCreated(signals.length - 1, msg.sender, action, symbol, amount);
    }

    function followTrader(address trader) external {
        followers[trader].push(msg.sender);
        emit FollowerAdded(trader, msg.sender);
    }

    function getSignals() external view returns (Signal[] memory) {
        return signals;
    }

    function getFollowers(address trader) external view returns (address[] memory) {
        return followers[trader];
    }
}