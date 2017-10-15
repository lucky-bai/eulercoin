App = {
  web3Provider: null,
  contracts: {},
  map_answers:{},

  init: function(){
    var Row = $('#Row');
    var Template = $('#Template');
    for (i = 1; i <= 20; i ++) {
      Template.find('.my-balance').text(2333);
      Template.find('.problem-no').text(i);
      Template.find('.problem-ans').text("not solved");
      Template.find('.btn-submit').attr('ans-id', i)
      Row.append(Template.html());
    };
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('EulerCoin.json', function(data){
      App.contracts.EulerCoin = TruffleContract(data);
      App.contracts.EulerCoin.setProvider(App.web3Provider);
      for (j = 1; j <= 20; j ++){
        (function(ii){
          App.contracts.EulerCoin.deployed().then(function(instance){
            return instance.getAnswer.call(ii);
          }).then(function(answer) {
            App.map_answers[ii]=answer.toNumber();
            App.displayResults();
          })
        })(j);
      }
      web3.eth.getAccounts(function(error, accounts){
        if (error) {
          console.log(error);
        }
        var account = accounts[0];
        App.contracts.EulerCoin.deployed().then(function(instance) {
          adoptionInstance = instance;
          return adoptionInstance.getBalance(account);
        }).then(function(result) {
          console.log(result);
          $('.my-balance').text(result.toNumber());

        }).catch(function(err) {
          console.log(err.message);
        });
      });
      return App.displayResults();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click','.btn-submit',App.handleSubmit);
  },

  displayResults:function() {
    for (i = 1; i <= 20; i++) {
      if (App.map_answers[i]) {
        $('.panel-body').eq(i-1).find('button').text('Too Late!').attr('disabled', true);
        $('.problem-ans').eq(i-1).text(App.map_answers[i]);
      }
    }
  },

  handleSubmit: function(){
    var petId = parseInt($(event.target).attr('ans-id'));
    var answer = window.prompt("your answer");
    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.EulerCoin.deployed().then(function(instance) {
        EulerInstance = instance;
        // Execute adopt as a transaction by sending account
        return EulerInstance.submitAnswer(petId, answer, {from: account});
      }).then(function(){
        location.reload();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
