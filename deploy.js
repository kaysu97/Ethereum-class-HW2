const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const bytecode = '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString()

let bank = new web3.eth.Contract(abi)

web3.eth.getAccounts().then(function (accounts) {

    // deploy contract
    
    console.log("bank user: "+accounts[0]);
    

    bank.deploy({
        data: bytecode,
    })
    .send({
        from: accounts[0],
        gas: 4700000
       
    })
    .on('error', function(error){ 
        console.log(error);
    })
    .on('transactionHash', function(transactionHash){
      
    })
    .on('receipt', function(receipt){
       console.log('receipt');
       console.log(receipt);
  
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmationNumber: "+confirmationNumber);
        
        
    })
    .then(function(newContractInstance){
        console.log("Save newContractInstance.options.address: ");
        console.log(newContractInstance.options.address);
        fs.writeFileSync('./address.txt',newContractInstance.options.address)
    });
})
