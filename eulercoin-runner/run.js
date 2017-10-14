var EulerCoin = artifacts.require("../contracts/EulerCoin.sol");

// Chuyi
//var account1 = "0x39da481c197790ccc9ebfe2425165a8433de62f1";

// Bai
var account1 = "0xa97b6ee76f383f60ad77c97d42b6e33af2918ee7";

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
