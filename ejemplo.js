var Sube = artifacts.require("Sube");

var kiosco = web3.eth.accounts[0];
var subte = web3.eth.accounts[1];
var colectivo = web3.eth.accounts[2];

var diegog = web3.eth.accounts[3];
var julian = web3.eth.accounts[4];

function muestraSaldo(quien, desc) {
    Sube.deployed().then(function (instance) { 
        return instance.saldo.call(quien, { from: quien });
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

function usuarioEnvia(de, a, cuanto) {
    Sube.deployed().then(function(instance) {
        return instance.enviar(a, cuanto, {from: de});
    }).then(function(result) {
        console.log("Enviado!")
    }).catch(function(e) {
        console.log("Error!:" + e)
    })
}

function usaSubte(quien) {
    Sube.deployed().then(function(instance) {
        return instance.comprarSubte({from: quien});
    }).then(function(result) {
        if(result) {
            console.log("Viajó Subte!")
        }else {
            console.log("NO Viajó Subte!")
        }
    }).catch(function(e) {
        console.log("Error!:" + e)
    })
}

function usaColectivo(quien) {
    Sube.deployed().then(function(instance) {
        return instance.comprarColectivo({from: quien});
    }).then(function(result) {
        if(result) {
            console.log("Viajó Colectivo!")
        }else {
            console.log("NO Viajó Colectivo!")
        }
    }).catch(function(e) {
        console.log("Error!:" + e)
    })
}

module.exports = function(callback) {

    //kioscoVende(julian, 1000);
    //usuarioEnvia(julian, diegog, 1000);
    //usaColectivo(diegog);
    usaSubte(diegog);

    callback();
}