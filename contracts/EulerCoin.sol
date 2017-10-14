pragma solidity ^0.4.15;

/* Mine EulerCoin by submitting answers to Project Euler problems! */
contract EulerCoin {
  /* This creates an array with all balances */
  mapping (address => uint256) public balanceOf;
  mapping (uint => str) public allAnswers;
  mapping (uint256 => uint256) public mockAnswers;
  mapping (uint256 => uint256) public Solvers;
  uint threshold;

  /* Initially, nobody has any EulerCoins */
  function EulerCoin() public {
      threshold = 3;
      mockAnswers[0] = 1;
      mockAnswers[1] = 123;
      Solvers[1] = 0;
  }

  /* Submit answer to generate EulerCoin */
  function submitAnswer(uint256 problemNumber, uint256 answerValue) public{
    // Todo: check if the answer is correct
      require(problemNumber >=0);
      require(problemNumber <= mockAnswers[0]);

      if(balanceOf[msg.sender]==0){
          balanceOf[msg.sender] = 1;
      }
      if(answerValue == mockAnswers[problemNumber]){
          Solvers[problemNumber] +=1;
          if (Solvers[problemNumber] <= threshold){
            balanceOf[msg.sender] += 100;
          }else{
              balanceOf[msg.sender] += uint(100*threshold/Solvers[problemNumber]);
          }
      }
    // Todo: award based on how many solvers already
    // For now, award 100 EulerCoins
    
    // Debug
  }

  /* Send coins */
  function transfer(address _to, uint256 _value) public {
    require(balanceOf[msg.sender] >= _value);           // Check if the sender has enough
    require(balanceOf[_to] + _value >= balanceOf[_to]); // Check for overflows
    balanceOf[msg.sender] -= _value;                    // Subtract from the sender
    balanceOf[_to] += _value;                           // Add the same to the recipient
  }

  function getBalance(address _from) constant returns (uint){
      return balanceOf[_from];
  }
}

  /* return all existing answers */
  function getAnswers() public returns(str) {
    return allAnswers;
  }
}
