const Server = require('./rpc/Server');
const Client = require('./rpc/Client');
class Rpc{
    constructor()
    {
        this.server = new Server();
        this.client = new Client();
    }
    static getServer(port)
    {
        return this.server.run(port);
    }

    static getClient(ip,port,funcName)
    {
        return this.client.run(ip,port,funcName)
    }
}
module.exports = Rpc;