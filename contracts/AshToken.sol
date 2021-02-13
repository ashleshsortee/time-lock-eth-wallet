pragma solidity ^0.6.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AshToken is Context, ERC20 {
    constructor() public ERC20("AshToken", "ASH") {
        _mint(_msgSender(), 10000 * (10**uint256(decimals())));
    }
}
