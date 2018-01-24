module.exports = {
    p2p:{
        ping:{
            requestParams:{},
            callBack:function(err, response) {
                console.log('back:', response.msg);
            }
        }
    }
};