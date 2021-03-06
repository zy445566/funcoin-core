const config = require("../config");
const Secret = require('./util/Secret');
const bignum = require('bignum');
const Block = require('./Block');
const Wallet = require('./Wallet');

class Worker{
    constructor(block,wallet)
    {
        this.block = block;
        this.wallet = wallet;
    }

    async genNewBlock()
    {
        let bigNumber = bignum(0);
        let lastBlock = await this.block.getLastBlock();
        let block = this.block.getBlock(null,0,lastBlock);
        while(!this.block.validBlock(lastBlock,block))
        {
            block.result = bigNumber.toString(10);
            block.id = Secret.text2Hex(`${lastBlock.id}:${block.result}:${block.producerAddress}`)
            bigNumber = bigNumber.add(1);
        }
        return block;
    }
}

module.exports = Worker;