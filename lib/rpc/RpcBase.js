const path = require('path');
const grpc = require('grpc');
const config = require("../../config");
class Base{
    constructor()
    {
        this.protosDir = path.join(__dirname,'protos');
        this.protoSet = {};
        
    }

    getProtoByName(name)
    {
        if (!this.protoSet[name])
        {
            this.protoSet[name] = grpc.load(path.join(this.protosDir,`${name}.proto`))[name.toLowerCase()];
        }
        return this.protoSet[name];
    }

    getKeyByNameAndServiceName(name,serviceName)
    {
        return `${name}/${serviceName}`;
    }

    ulFirst(word)
    {
        let wordArray = word.split("");
        wordArray[0] = wordArray[0].toLowerCase();
        return wordArray.join("");
    }
}
module.exports = Base;