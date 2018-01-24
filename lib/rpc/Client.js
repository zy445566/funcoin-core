const path = require('path');
const RpcBase = require('./RpcBase');
class Client extends RpcBase{
    constructor()
    {
        super();
        this.clientSet = {};
    }

    getClientByName(ProtoName,serviceName,ip,port)
    {
        let key = this.getKeyByNameAndServiceName(ProtoName,serviceName);
        if (!this.clientSet[key])
        {
            this.clientSet[key] =  client = this.getProtoByName(ProtoName)[serviceName](`${ip}:${port}`,grpc.credentials.createInsecure());
            let clientObject = require(path.join(__dirname,'clients',ProtoName))[serviceName];
            for(let funcName in clientObject)
            {
                client[funcName](clientObject[funcName].requestParams,clientObject[funcName].callBack);
            }
        }
        return this.clientSet[key];
    }
}
module.exports = Client;