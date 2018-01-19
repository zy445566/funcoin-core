const path = require('path');
const grpc = require('grpc');
const protosPath = path.join(__dirname,'protos');
const netFindProto = grpc.load(path.join(protosPath,'NetFind.proto')).netfind;
const port = '52220';
//-----server-----
var server = new grpc.Server();
server.addService(netFindProto.p2p.service, {ping: function(call, callback){
    callback(null, {msg: 'pong'});
}});
server.bind('0.0.0.0:'+port, grpc.ServerCredentials.createInsecure());
server.start();

//-----client-----
var client = new netFindProto.p2p('localhost:'+port,grpc.credentials.createInsecure());
client.ping({}, function(err, response) {
    console.log('back:', response.msg);
});