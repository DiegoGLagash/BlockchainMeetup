pragma solidity ^0.4.2;

contract Sube {
	mapping (address => uint) balances;
	address kiosk;
	address subte;
	address colectivo;

//	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function Sube(address _kiosk, address _subte, address _colectivo) {
		kiosk = _kiosk;
		subte = _subte;
		colectivo = _colectivo;
		balances[kiosk] = 100000000;
	}

	function sendCoin(address sender, address receiver, uint amount) returns(bool sufficient) {
		if (sender == subte) return false;
		if (sender == colectivo) return false;
		if (balances[sender] < amount) return false;
		balances[sender] -= amount;
		balances[receiver] += amount;
//		Transfer(sender, receiver, amount);
		return true;
	}

	// Un usuario transfiere a otro usuario
	function enviar(address receiver, uint amount) returns(bool sufficient) {
		return sendCoin(msg.sender, receiver, amount);
	}

	// Un kiosco vender a un usuario
	function vender(address receiver, uint amount) returns(bool sufficient) {
		return sendCoin(kiosk, receiver, amount);
	}

	// Un usuario transfiere al subte
	function comprarSubte() returns(bool sufficient) {
		return sendCoin(msg.sender, subte, 750);
	}

	// Un usuario transfiere al colectivo
	function comprarColectivo() returns(bool sufficient) {
		return sendCoin(msg.sender, colectivo, 600);
	}

	// Ver el saldo
	function saldo(address addr) returns(uint) {
		return balances[addr];
	}
}
