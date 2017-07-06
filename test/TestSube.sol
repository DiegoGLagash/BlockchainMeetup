pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Sube.sol";

contract TestSube {

  function testInitialBalanceUsingDeployedContract() {
    Sube meta = Sube(DeployedAddresses.Sube());

    uint expected = 100000000;

    Assert.equal(meta.saldo(tx.origin), expected, "El kiosco debe tener 100000000 inicialmente.");
  }

  // function testInitialBalanceWithNewMetaCoin() {
  //   Sube meta = new Sube();

  //   uint expected = 100000000;

  //   Assert.equal(meta.saldo(tx.origin), expected, "El kiosco debe tener 100000000 inicialmente.");
  // }

}
