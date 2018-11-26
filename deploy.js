const fs = require('fs')
const Web3 = require('web3')


let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const bytecode = '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString()



web3.eth.getAccounts().then(function (accounts) {

    // deploy contract
    
	let bank =  new web3.eth.Contract(abi).deploy(
   {
     from: accounts[0], 
     data: bytecode, 
     gas: '4700000'
   })
  function (e, contract){
   
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {

         console.log(' transactionHash: ' + contract.transactionHash + 
         
          'contractAddress: ' + contract.address 
          
          );
    	fs.writeFileSync('address.txt', contract.address);
    }

 }
  .on('receipt', console.log)
        .on('error', console.error)

})


