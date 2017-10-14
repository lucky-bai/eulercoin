pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/EulerCoin.sol";

contract TestAdoption {
  EulerCoin ec = EulerCoin(DeployedAddresses.EulerCoin());

  // Testing the adopt() function
  function testSubmitWrongAnswer() {
    uint returnedId = ec.submitAnswer(1,12);

    uint expected = 0;

    Assert.equal(returnedId, expected, "Submission of wrong answer should be recorded.");
  }

  // Testing retrieval of a single pet's owner
  function testSubmitRightAnswer() {
    // Expected owner is this contract
    uint returnedId = ec.submitAnswer(1,123);

    uint expected = 1;

    Assert.equal(returnedId, expected, "Submission of right answer should be recorded.");
  }

  }
