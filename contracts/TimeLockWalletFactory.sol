pragma solidity ^0.6.0;

import "./TimeLockWallet.sol";

contract TimeLockWalletFactory {
    TimeLockWallet public newWallet;
    mapping(address => address[]) wallets;

    event Created(
        address indexed wallet,
        address indexed beneficiary,
        address creator,
        uint256 releaseTime,
        uint256 createdAt,
        uint256 amount
    );

    function createNewWallet(
        IERC20 token,
        address beneficiary,
        uint256 releaseTime
    ) public payable returns (bool) {
        newWallet = new TimeLockWallet(
            token,
            beneficiary,
            msg.sender,
            block.timestamp,
            releaseTime
        );

        wallets[beneficiary].push(address(newWallet));

        emit Created(
            address(newWallet),
            beneficiary,
            msg.sender,
            releaseTime,
            block.timestamp,
            msg.value
        );
        return true;
    }

    function getWalletList(address owner)
        public
        view
        returns (address[] memory)
    {
        return wallets[owner];
    }
}
