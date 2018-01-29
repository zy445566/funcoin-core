const path = require('path');
const RpcBase = require('./RpcBase');
class Client extends RpcBase{
    constructor()
    {
        super();
        this.clientSet = {};
    }

    run(ip,port,funcName)
    {
        let  = this.getClientByName('NetFind','netfind','p2p',ip,port);
        client[funcName](client.funcs[funcName].requestParams,client.funcs[funcName].callBack);
    }

    getClientByName(name,packName,serviceName,ip,port)
    {
        let key = this.getKeyByName(name,packName,serviceName);
        if (!this.clientSet[key])
        {
            this.clientSet[key] = this.getProtoByName(name,packName)[serviceName](`${ip}:${port}`,grpc.credentials.createInsecure());
            this.clientSet[key].funcs = require(path.join(__dirname,'clients',packName,name))[serviceName];
        }
        return this.clientSet[key];
    }
}
module.exports = Client;