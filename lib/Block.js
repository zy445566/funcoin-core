const config = require("../config");
const Database = require('./Database');
const Secret = require('./util/Secret');
const _ = require('lodash');

class Block{
    constructor(wallet)
    {
        this.db = new Database();
        this.wallet = wallet;
    }

    getBlockKey(block_id,timestamp)
    {
        return `block:${timestamp}:${block_id}`;
    }

    async getGodBlock()
    {
        return await this.db.getList({
            lte:this.getBlockKey('',0),
            limit:1
        })[0];
    }

    async getLastBlock()
    {
        return await this.db.getList({
            lte:this.getBlockKey('',new Date().getTime()),
            reverse:true,
            limit:1
        })[0];
    }

    async getBeforeBlock(block)
    {
        let key = this.getBlockKey(
            block.parentId,
            block.parentTimestamp
        );
        return await this.db.get(key);
    }

    validBlock(parentBlock,block)
    {
        if (Secret.getHexInfo().HexKeys.indexOf(block.vail.random)<0)
        {
            return false;
        }
        let vail = new RegExp(`/^${parentBlock.vail.random}{${parentBlock.vail.difficulty}}[0-9a-fA-F]+$/`);
        if(vail.test(block.id))
        {
            if(block.id == Secret.text2Hex(`${parentBlock.id}:${block.result}:${block.producerAddress}`))
            {
                if (block.timestamp - parentBlock.timestamp > 0)
                {
                    return true;
                }
            }
        }
        return false;
    }

    async acceptBlock(block)
    {
        let parentKey = this.getBlockKey(
            block.parentId,
            block.parentTimestamp
        );
        let parentBlock = await this.db.get(parentKey);
        if (!this.validBlock(parentBlock,block))
        {
            //投票屏蔽该恶意节点(还未完成)
        }
        let inBlock = this.getBlock(block.id,block.result,parentBlock)
        let key = this.getBlockKey(
            inBlock.id,
            inBlock.timestamp
        );
        return await this.db.put(key,inBlock);
    }

    async genNewBlock(block)
    {
        let parentBlock = await this.getLastBlock();
        if (this.validBlock(parentBlock,block))
        {
            let key = this.getBlockKey(
                block.id,
                block.timestamp
            );
            return await this.db.put(key,block);
        }
        return false;
    }

    async genGodBlock(id)
    {
        let block = this.getBlock(id,null);
        let key = this.getBlockKey(
            block.id,
            block.timestamp
        );
        let value = block;
        return await this.db.put(key,value);
    }

    getBlock(id,result,parentBlock={})
    {   
        if (_.isEmpty(parentBlock)){parentBlock = await this.getLastBlock();}
        let parentId = _.isEmpty(parentBlock)?null:parentBlock.id;
        let timestamp = new Date().getTime();
        let parentTimestamp = _.isEmpty(parentBlock)?new Date().getTime():parentBlock.timestamp;
        let hight = _.isEmpty(parentBlock)?0:++parentBlock.hight;
        let difficulty = timestamp-parentTimestamp>config.outPutBlockTime && 
        parentBlock.difficulty>2?--parentBlock.difficulty:++parentBlock.difficulty;
        if (config.totalNum+releaseNum<(parentBlock.hight+1)*config.awardNum)
        {
            return false;
        }
        
        return {
            id:id,
            parentId:parentId,
            timestamp:new Date().getTime(),
            parentTimestamp:parentTimestamp,
            hight:hight,
            vail:{
                difficulty:difficulty,
                random:id[id.length-1],
            },
            result:result,
            producerAddress:this.wallet.getWalletAddress()
        };
    }

    //检测自身
    checkBlock()
    {
        
    }
}
module.exports = Block;