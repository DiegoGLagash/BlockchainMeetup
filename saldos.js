var Sube = artifacts.require("Sube");

var kiosco = web3.eth.accounts[0];
var subte = web3.eth.accounts[1];
var colectivo = web3.eth.accounts[2];

var diegog = web3.eth.accounts[3];
var julian = web3.eth.accounts[4];

function muestraSaldo(who, desc) {
    Sube.deployed().then(function (instance) { 
        return instance.saldo.call(who, { from: who });
    }).then(function (balance) { 
        console.log(desc + balance.toNumber());
    })
}

function kioscoVende(quien, cuanto) {
    Sube.deployed().then(function(instance) {
        return instance.vender(quien, cuanto, {from: kiosco});
    }).then(function(result) {
        console.log("Vendido!")
    }).catch(function(e) {
        console.log("Error!:" + e)
    })
}

module.exports = function(callback) {

    muestraSaldo(kiosco, "k:");
    muestraSaldo(subte, "s:");
    muestraSaldo(colectivo, "c:");

    muestraSaldo(diegog, "diegog:");
    muestraSaldo(julian, "julian:");
    
    callback();
}