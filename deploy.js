const HdWallet = require('truffle-hdwallet-provider');
const Web3=require('web3');
const {bytecode,interface} = require('./compile');

const provider = new HdWallet(
    "smile canal chapter permit tent minor label horse puzzle human trick please",
    "https://rinkeby.infura.io/v3/5eeaff48d7504dd78ff9a33a7960558f"
);

const web3 = new Web3(provider);
let accounts;
let result;
const deploy =async()=>{

      accounts =  await web3.eth.getAccounts();
      result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data: '0x'+bytecode})
      .send({from:accounts[0], gas:1000000})
    console.log('contract deployed to ',result.options.address);
}

deploy();