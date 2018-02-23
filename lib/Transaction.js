const _ = require('lodash');
class Transaction {

    constructor(wallet)
    {
        this.db = new Database();
        this.wallet = wallet;
        this.block = block;
    }

    getTransKey(address,timestamp)
    {
        return `trans:${address}:${timestamp}`;
    }

    async getLastTrans(address)
    {
        return await this.db.getList({
            lte:this.getTransKey(address,new Date().getTime()),
            reverse:true,
            limit:1
        })[0];
    }

    //type in (trans,block)
    //remark
    getTrans(type,address,senderAddress,accepterAddress,cost,remark="")
    {
        let timestamp = new Date().getTime();
        let id = `${address}:${timestamp}`;
        let parent;
        switch (type)
        {
            case 'trans':
                parent = await this.getLastTrans(address);
                break;
            case 'block':
                parent = await this.block.getLastBlock();
                break;
        }
        // 一定会有父区块，由于你的账单来源只能源于别人对你的转账和挖区块获取，只有有父才能交易
        if (_.isEmpty(parent)){return "no parent"}
        let parentId = parentBlock.id;
        let parentTimestamp = parentBlock.timestamp;
        if (address == senderAddress && remark==""){remark="out"}
        if (address == accepterAddress && remark==""){remark="in"}
        let baseUnit = 100000000;
        cost = Math.ceil(cost*baseUnit)/baseUnit;
        let totalCost = Math.ceil(cost*1.002*baseUnit)/baseUnit;
        let usedCost = totalCost - cost;
        let data = {
            id:id,
            type:type,
            parentId:parentId,
            timestamp:timestamp,
            parentTimestamp:parentTimestamp,
            address:address,
            senderAddress:senderAddress,
            accepterAddress:accepterAddress,
            cost:cost,
            totalCost:totalCost,
            remark:remark
        };
        let msg = JSON.stringify(data);
        let signature = this.wallet.sign(msg);
        return {
            msg:msg,
            signature:signature
        }
    }
}
module.exports = Transaction;