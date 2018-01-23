const path = require('path');
const grpc = require('grpc');
const config = require("../../config");
class Base{
    constructor()
    {
        this.protosDir = path.join(__dirname,'protos');
        this.protoSet = {};
        
    }

    getProtoByPackName(packname)
    {
        if (!this.protoSet[packname])
        {
            this.protoSet[packname] = grpc.load(path.join(this.protosDir,`${packname}.proto`))[packname.toLowerCase()];
        }
        return this.protoSet[packname];
    }
    
    splitName(name)
    {
        let nameArray = name.split("/");
        return {
            packname:nameArray[0],
            servicename:nameArray[1],
        }
    }

    ulFirst(word)
    {
        let wordArray = word.split("");
        wordArray[0] = wordArray[0].toLowerCase();
        return wordArray.join("");
    }
}
module.exports = Base;