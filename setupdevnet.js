
module.exports = function(callback) {
    
    for(var i = 0; i < 10; i++) {
        console.log(web3.personal.unlockAccount(web3.eth.accounts[i], "", 60*1000));
    } 
    
    callback();
}
