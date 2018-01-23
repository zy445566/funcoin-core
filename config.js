const path = require("path");
module.exports = {
    rpc:{
        port:52220
    },
    godBlock:{
        id:"fc1024fc",
        parentId:null,
        timestamp:new Date().getTime(),
        parentTimestamp:new Date().getTime(),
        vail:{
            difficulty:1,
            random:Math.floor(Math.random()*16).toString(16),
        },
        result:null
    },
    outPutBlockTime:10*60*1000,
    dataPath:path.join(__dirname,"data")
};