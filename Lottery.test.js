const {bytecode,interface}= require('../compile');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

let Accounts;
let Lottery;
beforeEach(async()=>{

    Accounts = await web3.eth.getAccounts();
    console.log('trying to deploy contract ');
    Lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x'+bytecode})
    .send({from:Accounts[0],gas:1000000})
    console.log('contract deployed to '+Lottery.options.address);

});
describe('Lottery describe',()=>{
    it('test1',()=>{
            assert.ok(Lottery.options.address);
    });

    it('test2-->enter',async()=>{
        await Lottery.methods.enter().send({
            from :Accounts[0],
            value :web3.utils.toWei('0.11','ether')
        });
        const players = await Lottery.methods.playersList().call();
        assert.strictEqual(Accounts[0],players[0]);

    });

    it('test 3 --> multiple enters',async()=>{
        await Lottery.methods.enter().send({
            from :Accounts[0],
            value :web3.utils.toWei('0.11','ether')
        });

        await Lottery.methods.enter().send({
            from :Accounts[1],
            value :web3.utils.toWei('0.11','ether')
        });
        await Lottery.methods.enter().send({
            from :Accounts[2],
            value :web3.utils.toWei('0.11','ether')
        });
        const players = await Lottery.methods.playersList().call();
        assert.strictEqual(Accounts[0],players[0]);
        assert.strictEqual(Accounts[1],players[1]);
        assert.strictEqual(Accounts[2],players[2]);

        assert.strictEqual(3,players.length);
    });

    it('only manager should pick winner',async()=>{
        try{
       await web3.eth.methods.pickWinner().call({from:account[0]});
       assert(false);
        }catch(err)
        {
            assert(err);
        }
        
    });

    

})
