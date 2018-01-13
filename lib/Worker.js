const config = require("../config");
const Secret = require('./Secret');
const bignum = require('bignum');
const Block = require('./Block');

class Worker{
    constructor()
    {
        this.Block = new Block();
    }

    async genNewBlock()
    {
        let bigNumber = bignum(0);
        let lastBlock = await this.Block.getLastBlock();
        let block = {
            id:null,
            parentId:lastBlock.id,
            timestamp:new Date().getTime(),
            parentTimestamp:lastBlock.timestamp,
            vail:{
                difficulty:lastBlock.vail.difficulty,
                random:Math.floor(Math.random()*16).toString(16),
            },
            result:null
        }
        while(!this.Block.validBlock(lastBlock,block))
        {
            block.result = bigNumber.toString(10);
            block.id = Secret.text2Hex(`${lastBlock.id}:${block.result}`)
            bigNumber = bigNumber.add(1);
        }
        return block;
    }
}

module.exports = Worker;