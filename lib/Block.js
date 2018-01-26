const config = require("../config");
const Database = require('./Database');
const Secret = require('./Secret');

class Block{
    constructor()
    {
        this.db = new Database();
    }

    getBlockKey(block_id,timestamp)
    {
        return `block:${timestamp}:${block_id}`;
    }

    async getGodBlock()
    {
        let key = this.getBlockKey(
            config.godBlock.id,
            config.godBlock.timestamp
        );
        return await this.db.get(key);
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
        let inBlock = {
            id:block.id,
            parentId:parentBlock.id,
            timestamp:block.timestamp,
            parentTimestamp:parentBlock.timestamp,
            vail:{
                difficulty:0,
                random:block.vail.random,
            },
            result:block.result
        }
        // 动态调节出块难度
        if (block.timestamp - parentBlock.timestamp > config.outPutBlockTime)
        {
            inBlock.vail.difficulty = parentBlock.vail.difficulty+1;
        } else {
            if (parentBlock.vail.difficulty<2)
            {
                inBlock.vail.difficulty = 1;
            } else {
                inBlock.vail.difficulty = parentBlock.vail.difficulty - 1;
            }
        }
        let key = this.getBlockKey(
            inBlock.id,
            inBlock.timestamp
        );
        let value = JSON.stringify(inBlock);
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

    async genGodBlock()
    {
        let key = this.getBlockKey(
            config.godBlock.id,
            config.godBlock.timestamp
        );
        let value = config.godBlock;
        return await this.db.put(key,value);
    }
}
module.exports = Block;