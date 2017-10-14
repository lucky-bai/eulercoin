var EulerCoin = artifacts.require("../contracts/EulerCoin.sol");

// Chuyi
//var account1 = "0x39da481c197790ccc9ebfe2425165a8433de62f1";

// Bai
var account1 = "0xfe77b7f639a5a2cd8fc20c1e5431fc0d52295e3d";

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
  });

  console.log('Done!');
}
