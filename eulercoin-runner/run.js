var EulerCoin = artifacts.require("../contracts/EulerCoin.sol");

var account1 = "0xe0dbaf8d668d3694f87c9c4f255ffcccc01878c3";
//var account2 = "0x0000000000000000000000000000000000000002";

module.exports = function(callback) {
  console.log('Starting');

  EulerCoin.deployed().then(function(eulerCoin) {
    console.log(eulerCoin);
    eulerCoin.submitAnswer(1, 5522, {from: account1}).then(function() {
      console.log('Callback Successful');
    });
    /*
    eulerCoin.submitAnswer.call(
      account1, {
        problemNumber: 1,
        answer: 5522,
      }).then(function(rval) {
        console.log('In callback');
        console.log(rval);
      });
    */
  });

  console.log('Done!');
}
