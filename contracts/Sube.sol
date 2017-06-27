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
		balances[kiosk] = 10000000;
		balances[subte] = 100000;
		balances[colectivo] = 100000;
	}

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
//		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function enviar(address receiver, uint amount) returns(bool sufficient) {
		return sendCoin(receiver, amount);
	}

	function vender(address receiver, uint amount) returns(bool sufficient) {
		return sendCoin(receiver, amount);
	}

	function comprarSubte() returns(bool sufficient) {
		return sendCoin(receiver, 750);
	}

	function comprarColectivo() returns(bool sufficient) {
		return sendCoin(receiver, 600);
	}

	function saldo(address addr) returns(uint) {
		return balances[addr];
	}
}
