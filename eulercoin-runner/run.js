var EulerCoin = artifacts.require("../contracts/EulerCoin.sol");

// Chuyi
//var account1 = "0x39da481c197790ccc9ebfe2425165a8433de62f1";

// Bai
var account1 = "0x27917aaef3a9a06a6aae290a260a4a8a2c713799";

//var account2 = "0x0000000000000000000000000000000000000002";

module.exports = function(callback) {

  EulerCoin.deployed().then(function(eulerCoin) {
    eulerCoin.getBalance(account1).then(function(res){
      console.log('Initial balance: ' + res.toNumber());

      eulerCoin.submitAnswer(16, 112, {from: account1}).then(function(res) {
        eulerCoin.getBalance(account1).then(function(res){
          console.log('Balance after wrong submission: ' + res.toNumber());

          eulerCoin.submitAnswer(16, 1366, {from: account1}).then(function(res) {
            eulerCoin.getBalance(account1).then(function(res){
              console.log('Balance after correct submission: ' + res.toNumber());

              eulerCoin.submitAnswer(16, 1366, {from: account1}).then(function(res) {
                eulerCoin.getBalance(account1).then(function(res){
                  console.log('Balance after duplicate submission: ' + res.toNumber());
                });
              });
            });
          });
        });
      });
    });
  });

}
