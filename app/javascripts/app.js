// Webpack necesita el CSS
import "../stylesheets/app.css";

// algunas librerías
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Definicion del Contrato
import sube_contract from '../../build/contracts/Sube.json'

window.$ = window.jQuery = require('jquery');

// Instancia del contrato
var Sube = contract(sube_contract);

var accounts;
var kiosco;
var subte;
var colectivo;
var diegog;
var julian;

window.App = {
  diegog: function() {
    return diegog;
  },

  julian: function() {
    return julian;
  },

  start: function() {
    var self = this;

    // Para que el contrato sepa con quien interactuar
    Sube.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("Error:" + err);
        return;
      }

      if (accs.length == 0) {
        alert("No hay cuentas disponibles.");
        return;
      }

      accounts = accs;
      kiosco = accounts[0];
      subte = accounts[1];
      colectivo = accounts[2];
      diegog = accounts[3];
      julian = accounts[4];

      self.refreshBalance();
    });
  },

  setStatus: function(message) {
    $('#status').text(message);
  },

  refreshBalance: function() {
    var self = this;

    var meta;
    Sube.deployed().then(function(instance) {
      meta = instance;
      return meta.saldo.call(kiosco);
    }).then(function(value) {
      $('#balanceKiosco').text(value.valueOf());
      return meta.saldo.call(subte);
    }).then(function(value) {
      $('#balanceSubte').text(value.valueOf());
      return meta.saldo.call(colectivo);
    }).then(function(value) {
      $('#balanceColectivo').text(value.valueOf());
      return meta.saldo.call(diegog);
    }).then(function(value) {
      $('#balanceDiegoG').text(value.valueOf());
      return meta.saldo.call(julian);
    }).then(function(value) {
      $('#balanceJulian').text(value.valueOf());
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error al traer el saldo log.");
    });
  },

  vender: function(quien, amount) {
    var self = this;

    amount = parseInt(amount);
    if(isNaN(amount)) {
      this.setStatus("Monto invalido.");
      return;
    }

    var meta;
    Sube.deployed().then(function(instance) {
      meta = instance;
      // Uncomment when using DevNet, not supported on TestRPC
      //self.setStatus("Enviando transaccion...");
      return meta.vender(quien, amount, {from: kiosco});
    }).then(function() {
      self.setStatus("Transaccion enviada.");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error vendiendo.");
    });
  },

  enviar: function(origen, destino, amount) {
    var self = this;

    amount = parseInt(amount);
    if(isNaN(amount)) {
      this.setStatus("Monto invalido.");
      return;
    }

    var meta;
    Sube.deployed().then(function(instance) {
      meta = instance;
      // Uncomment when using DevNet, not supported on TestRPC
      //web3.personal.unlockAccount(origen, "", 60*1000);
      self.setStatus("Enviando transaccion...");
      return meta.enviar(destino, amount, {from: origen});
    }).then(function() {
      self.setStatus("Transaccion enviada.");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error enviando.");
    });
  },

  comprarSubte : function(quien) {
    var self = this;

    var meta;
    Sube.deployed().then(function(instance) {
      meta = instance;
      // Uncomment when using DevNet, not supported on TestRPC
      //web3.personal.unlockAccount(quien, "", 60*1000);
      self.setStatus("Enviando transaccion...");
      return meta.comprarSubte({from: quien});
    }).then(function() {
      self.setStatus("Transaccion enviada.");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error comprando subte.");
    });
  },

  comprarColectivo : function(quien) {
    var self = this;

    var meta;
    Sube.deployed().then(function(instance) {
      meta = instance;
      // Uncomment when using DevNet, not supported on TestRPC
      //web3.personal.unlockAccount(quien, "", 60*1000);
      self.setStatus("Enviando transaccion...");
      return meta.comprarColectivo({from: quien});
    }).then(function() {
      self.setStatus("Transaccion enviada.");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error comprando colectivo.");
    });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
