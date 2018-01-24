module.exports = {
    p2p:{
        ping: function(call, callback){
            callback(null, {msg: 'pong'});
        }
    }
};