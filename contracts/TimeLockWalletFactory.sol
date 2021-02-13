pragma solidity ^0.6.0;

import "./TimeLockWallet.sol";
import "./CloneFactory.sol";

contract TimeLockWalletFactory is CloneFactory {
    TimeLockWallet public newWallet;

    mapping(address => address[]) wallets;
    address masterContract;

    event Created(
        address indexed wallet,
        address indexed beneficiary,
        address creator,
        uint256 releaseTime,
        uint256 createdAt,
        uint256 amount
    );

    constructor(address _masterContract) public {
        masterContract = _masterContract;
    }

    function createNewWallet(
        IERC20 token,
        address beneficiary,
        uint256 releaseTime
    ) public payable returns (bool) {
        TimeLockWallet timeLockWallet =
            TimeLockWallet(createClone(masterContract));

        timeLockWallet.init(
            token,
            beneficiary,
            msg.sender,
            block.timestamp,
            releaseTime
        );

        wallets[beneficiary].push(address(timeLockWallet));

        emit Created(
            address(timeLockWallet),
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
