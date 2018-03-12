const path = require("path");
module.exports = {
    awardNum:25,
    totalNum:2100*10000,
    costRate:0.002,
    baseUnit:100000000,
    baseMergeTime:18*30*24*3600*1000,
    baseReturnTime:50*18*30*24*3600*1000,
    outPutBlockTime:10*60*1000,
    dataPath:path.join(__dirname,"data")
};