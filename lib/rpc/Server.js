const grpc = require('grpc');
const path = require('path');
const RpcBase = require('./RpcBase');
class Server extends RpcBase{
    constructor()
    {
        super();
        this.server = new grpc.Server();
        this.serviceSet = {};
    }

    run(port)
    {
        this.addServiceByName('NetFind','netfind','p2p');
        this.server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
        this.server.start();
    }

    addServiceByName(name,packName,serviceName)
    {
        let key = this.getKeyByName(name,packName,serviceName);
        if (!serviceSet[key])
        {
            let serviceObject = require(path.join(__dirname,'servers',packName,name))[serviceName];
            this.server.addService(this.getProtoByName(name,packName)[serviceName].service, serviceObject);
            serviceSet[key] = serviceObject;
        }
        return serviceSet[key];
    }
}
module.exports = Server;