const path = require("path");
module.exports = {
    rpc:{
        port:52220
    },
    awardNum:25,
    outPutBlockTime:10*60*1000,
    dataPath:path.join(__dirname,"data")
};