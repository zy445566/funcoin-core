module.exports = {
    ping:{
        requestParams:{},
        callBack:function(err, response) {
            console.log('back:', response.msg);
        }
    }
};