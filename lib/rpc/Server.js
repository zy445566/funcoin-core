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
        this.addServiceByName('NetFind');
        this.server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
        this.server.start();
    }

    addServiceByPackName(packname)
    {
        if (!serviceSet[packname])
        {
            let serviceObject = require(path.join(__dirname,'services',packname));
            this.server.addService(this.getProtoByPackName(packname), serviceObject);
            serviceSet[packname] = serviceObject;
        }
        return serviceObject;
    }
}
module.exports = Server;