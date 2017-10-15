App = {
  web3Provider: null,
  contracts: {},
  map_answers:{},

  init: function() {
    // Load pets.
    var petsRow = $('#petsRow');
    var petTemplate = $('#petTemplate');

    for (i = 1; i <= 20; i ++) {
      petTemplate.find('.my-balance').text(2333);
      petTemplate.find('.problem-no').text(i);
      petTemplate.find('.problem-ans').text("not solved");
      petTemplate.find('.btn-submit').attr('ans-id', i)

      petsRow.append(petTemplate.html());
    };

    return App.initWeb3();
  },

  initWeb3: function() {
     // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
     $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();

    });
    $.getJSON('EulerCoin.json', function(data){

      App.contracts.EulerCoin = TruffleContract(data);

      // Set the provider for our contract
      App.contracts.EulerCoin.setProvider(App.web3Provider);

      for (j = 1; j <= 20; j ++) {
        (function(ii){
          App.contracts.EulerCoin.deployed().then(function(instance){
            return instance.getAnswer.call(ii);
          }).then(function(answer) {
            App.map_answers[ii]=answer.toNumber();
            //console.log(App.map_answers)
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
          // Execute adopt as a transaction by sending account
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
    $(document).on('click','.btn-adopt', App.handleAdopt);
    $(document).on('click','.btn-submit',App.handleSubmit);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;
    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  /* display answers  not complete  */
  displayResults:function() {
    for (i = 1; i <= 20; i++) {
      /* haven't finish this part  */
      if (App.map_answers[i]) {
        $('.panel-body').eq(i-1).find('button').text('solved!').attr('disabled', true);
        $('.problem-ans').eq(i-1).text(App.map_answers[i]);
      }
    }
  },

  handleAdopt: function() {
    event.preventDefault();
    var petId = parseInt($(event.target).data('ans-id'));
    var adoptionInstance;
    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleSubmit: function(){
    var petId = parseInt($(event.target).attr('ans-id'));

    var answer = window.prompt("your answer");
    //console.log(petId,answer);

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
