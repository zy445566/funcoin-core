const path = require('path');
const RpcBase = require('./RpcBase');
class Client extends RpcBase{
    constructor()
    {
        super();
        this.clientSet = {};
    }

    getClientByName(name,ip,port)
    {
        
        if (!this.clientSet[name])
        {
            let nameObject = this.splitName(name);
            this.clientSet[name] =  client = this.getProtoByPackName(nameObject.packname)[nameObject.servicename](`${ip}:${port}`,grpc.credentials.createInsecure());
            let clientObject = require(path.join(__dirname,'clients',nameObject.packname));
            for(let funcName in clientObject)
            {
                client[funcName](clientObject[funcName].requestParams,clientObject[funcName].callBack);
            }
        }
        return this.clientSet[name];
    }
}
module.exports = Client;