const path = require("path");
module.exports = {
    rpc:{
        port:52220
    },
    awardNum:25,
    totalNum:2100*10000,
    releaseNum:0,//根据挖矿难度计算释放金额的回归年份
    outPutBlockTime:10*60*1000,
    dataPath:path.join(__dirname,"data")
};