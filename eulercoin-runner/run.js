var EulerCoin = artifacts.require("../contracts/EulerCoin.sol");

var account1 = "0x39da481c197790ccc9ebfe2425165a8433de62f1";
//var account2 = "0x0000000000000000000000000000000000000002";

module.exports = function(callback) {
  console.log('Starting');

  EulerCoin.deployed().then(function(eulerCoin) {
    console.log(eulerCoin);
      eulerCoin.getBalance(account1).then(function(res){
          console.log(res);
      }
      );
    eulerCoin.submitAnswer(1, 5522, {from: account1}).then(function(res) {
      console.log('Callback Successful');
      console.log(res);
    });
      eulerCoin.getBalance(account1).then(function(res){
          console.log(res);
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
