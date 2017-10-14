pragma solidity ^0.4.15;

/* Mine EulerCoin by submitting answers to Project Euler problems! */
contract EulerCoin {
  /* This creates an array with all balances */
  mapping (address => uint256) public balanceOf;

  // Answers that we know (and have been submitted)
  uint numProblems = 20;
  mapping (uint => uint256) public allAnswers;

  mapping (uint256 => uint256) public solvers;

  // Constants used to determine reward payout
  uint threshold = 70;
  uint256 MAX_REWARD = 10000;

  /* Initially, nobody has any EulerCoins */
  function EulerCoin() public {
      solvers[1] = 695711;
      solvers[2] = 59823;
      solvers[3] = 31092;
      solvers[4] = 9412;
      solvers[5] = 8232;
      solvers[6] = 6512;
      solvers[7] = 4098;
      solvers[8] = 3199;
      solvers[9] = 2861;
      solvers[10] = 1942;
      solvers[11] = 1530;
      solvers[12] = 1142;
      solvers[13] = 946;
      solvers[14] = 731;
      solvers[15] = 518;
      solvers[16] = 412;
      solvers[17] = 299;
      solvers[18] = 197;
      solvers[19] = 59;
      solvers[20] = 17;
      setupAnswers();
  }

  /* Submit answer to generate EulerCoin */
  function submitAnswer(uint problemNumber, uint256 answerValue) public{
      require(problemNumber >= 1);
      require(problemNumber <= numProblems);
      require(allAnswers[problemNumber] == 0);

      if(checkAnswer(problemNumber, answerValue)){
          if (solvers[problemNumber] <= threshold){
              balanceOf[msg.sender] += MAX_REWARD;
          }else{
              balanceOf[msg.sender] += uint(MAX_REWARD*threshold/solvers[problemNumber]);
          }
          allAnswers[problemNumber] = answerValue;
      }
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

  /* return existing answer */
  function getAnswer(uint problemId) public returns(uint256) {
    return allAnswers[problemId];
  }


  // PRETEND EVERYTHING BELOW THIS DOESNT EXIST
  mapping (uint => uint256) public mockAnswers;

  function setupAnswers() {
    mockAnswers[1] = 233168;
    mockAnswers[2] = 4613732;
    mockAnswers[3] = 6857;
    mockAnswers[4] = 906609;
    mockAnswers[5] = 232792560;
    mockAnswers[6] = 25164150;
    mockAnswers[7] = 104743;
    mockAnswers[8] = 23514624000;
    mockAnswers[9] = 31875000;
    mockAnswers[10] = 142913828922;
    mockAnswers[11] = 70600674;
    mockAnswers[12] = 76576500;
    mockAnswers[13] = 5537376230;
    mockAnswers[14] = 837799;
    mockAnswers[15] = 137846528820;
    mockAnswers[16] = 1366;
    mockAnswers[17] = 21124;
    mockAnswers[18] = 1074;
    mockAnswers[19] = 171;
    mockAnswers[20] = 648;
  }

  function checkAnswer(uint256 problemNumber, uint256 answerValue) public returns (bool) {
    // Pretend that we're submitting to Project Euler..
    return answerValue == mockAnswers[problemNumber];
  }
}
