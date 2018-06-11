pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Escrow.sol";

contract TestEscrow {
  function testSettingInitialValues() public {
    Escrow escrow = Escrow(DeployedAddresses.Escrow());

    address myAddress = escrow.getProviderAddress();
    address clientAddress = escrow.getClientAddress();

    Assert.equal(myAddress, address(0xE833fDE163057aa26B07D6E1569dC9A4AFc61878), "Should set provider address");
    Assert.equal(clientAddress, address(0x12491bB3983dE026A6770Fd0CA967CC58FF56777), "Should set client address");
  }
}