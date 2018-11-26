const fs = require('fs')
const Web3 = require('web3')

async function main() {
    let web3 = new Web3('http://localhost:8545')
    const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
    const bytecode = '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString()

    try {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0];
        // deply contract
        let bank = await new web3.eth.Contract(abi).deploy({ data: bytecode })
        
        // estimate gas usage
        let gasEstimate = await bank.estimateGas()
        console.log('Estimated gas: ' + gasEstimate)

        // send deployment
        let result = await bank.send({ from: account, gas: parseInt(gasEstimate * 1.05) })
        console.log("contract deployed to", result.options.address)

        // save contract address to txt file
        fs.writeFileSync('./address.txt', result.options.address)
    } catch (error) {
        console.log(error)
    }
}

main()