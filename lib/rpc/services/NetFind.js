module.exports = {
    ping: function(call, callback){
        callback(null, {msg: 'pong'});
    }
};