var Sube = artifacts.require("./Sube.sol");

contract('Sube', function(accounts) {
  var kiosco = accounts[0];
  var subte = accounts[1];
  var colectivo = accounts[2];
  var diegog = accounts[3];
  var julian = accounts[4];

  it("al iniciar, kiosco debería tener 100000000.", function() {
    return Sube.deployed().then(function(instance) {
      return instance.saldo.call(kiosco);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 100000000, "100000000 no estan en el kiosco.");
    });
  });

  it("al iniciar, diegog debería tener 0.", function() {
    return Sube.deployed().then(function(instance) {
      return instance.saldo.call(diegog);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "0 no estan en la cuenta de diegog.");
    });
  });

  it("se debe poder comprar 10000 $ube.", function() {
    var meta;
    var saldoInicial;

    return Sube.deployed().then(function(instance) {
      meta = instance;
      return meta.saldo.call(diegog);
    }).then(function(saldo) {
      saldoInicial = saldo.toNumber();
      return meta.vender(diegog, 10000);
    }).then(function(isSufficient) {
      return meta.saldo.call(diegog);
    }).then(function(saldo) {
      var result = saldo.toNumber();
      assert.equal(saldoInicial + 10000, result, "La cuenta no ha incrementado su saldo en 10000.");
    });
  });

  it("el costo del Subte debe ser 750.", function() {
    var meta;
    var saldoInicial;

    return Sube.deployed().then(function(instance) {
      meta = instance;
      return meta.saldo.call(diegog);
    }).then(function(saldo) {
      saldoInicial = saldo.toNumber();
      return meta.comprarSubte( {from: diegog} );
    }).then(function(isSufficient) {
      return meta.saldo.call(diegog);
    }).then(function(saldo) {
      var result = saldo.toNumber();
      assert.equal(saldoInicial - 750, result, "La cuenta no ha reducido su saldo en 750.");
    });
  });

  it("el Subte vendio un pasaje por 750.", function() {
    var meta;
    var saldoInicial;

    return Sube.deployed().then(function(instance) {
      meta = instance;
      return meta.saldo.call(subte);
    }).then(function(saldo) {
      saldoInicial = saldo.toNumber();
      return meta.comprarSubte( {from: diegog} );
    }).then(function(isSufficient) {
      return meta.saldo.call(subte);
    }).then(function(saldo) {
      var result = saldo.toNumber();
      assert.equal(saldoInicial + 750, result, "La cuenta no ha incrementado su saldo en 750.");
    });
  });

  it("el costo del Colectivo debe ser 600.", function() {
    var meta;
    var saldoInicial;

    return Sube.deployed().then(function(instance) {
      meta = instance;
      return meta.saldo.call(diegog);
    }).then(function(saldo) {
      saldoInicial = saldo.toNumber();
      return meta.comprarColectivo( {from: diegog} );
    }).then(function(isSufficient) {
      return meta.saldo.call(diegog);
    }).then(function(saldo) {
      var expected = saldo.toNumber();
      assert.equal(saldoInicial - 600, expected, "La cuenta no ha reducido su saldo en 600.");
    });
  });

  it("el Colectivo vendio un pasaje por 600.", function() {
    var meta;
    var saldoInicial;

    return Sube.deployed().then(function(instance) {
      meta = instance;
      return meta.saldo.call(colectivo);
    }).then(function(saldo) {
      saldoInicial = saldo.toNumber();
      return meta.comprarColectivo( {from: diegog} );
    }).then(function(isSufficient) {
      return meta.saldo.call(colectivo);
    }).then(function(saldo) {
      var result = saldo.toNumber();
      assert.equal(saldoInicial + 600, result, "La cuenta no ha incrementado su saldo en 600.");
    });
  });

  it("se debe poder transferir 100 entre diegog y julian.", function() {
    var meta;
    var saldoInicialDiegoG, saldoInicialJulian;
    var saldoNuevoDiegoG;

    return Sube.deployed().then(function(instance) {
      meta = instance;
      return meta.saldo.call(diegog);
    }).then(function(saldo) {
      saldoInicialDiegoG = saldo.toNumber();
      return meta.saldo.call(julian);
    }).then(function(saldo) {
      saldoInicialJulian = saldo.toNumber();
      return meta.enviar(julian, 100, {from: diegog} );
    }).then(function(isSufficient) {
      return meta.saldo.call(diegog);
    }).then(function(saldo) {
      saldoNuevoDiegoG = saldo.toNumber();
      return meta.saldo.call(julian);
    }).then(function(saldo) {
      var result = saldo.toNumber();
      assert.equal(saldoInicialDiegoG - 100, saldoNuevoDiegoG, "La cuenta no ha incrementado su saldo en 600.");
      assert.equal(saldoInicialJulian + 100, result, "La cuenta no ha incrementado su saldo en 600.");
    });
  });

});
