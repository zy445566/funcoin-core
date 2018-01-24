const path = require('path');
const RpcBase = require('./RpcBase');
class Client extends RpcBase{
    constructor()
    {
        super();
        this.clientSet = {};
    }

    getClientByName(name,packName,serviceName,ip,port)
    {
        let key = this.getKeyByName(name,packName,serviceName);
        if (!this.clientSet[key])
        {
            this.clientSet[key] =  client = this.getProtoByName(name,packName)[serviceName](`${ip}:${port}`,grpc.credentials.createInsecure());
            let clientObject = require(path.join(__dirname,'clients',packName,name))[serviceName];
            for(let funcName in clientObject)
            {
                client[funcName](clientObject[funcName].requestParams,clientObject[funcName].callBack);
            }
        }
        return this.clientSet[key];
    }
}
module.exports = Client;