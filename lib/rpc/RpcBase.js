const path = require('path');
const grpc = require('grpc');
const config = require("../../config");
class Base{
    constructor()
    {
        this.protosDir = path.join(__dirname,'protos');
        this.protoSet = {};
        
    }

    getProtoByName(name,packName)
    {
        let key = this.getKeyByName(name,packName);
        if (!this.protoSet[key])
        {
            this.protoSet[key] = grpc.load(path.join(this.protosDir,packName,`${name}.proto`));
        }
        return this.protoSet[key];
    }

    getKeyByName(...nameArgs)
    {
        return nameArgs.join("/");
    }

    ulFirst(word)
    {
        let wordArray = word.split("");
        wordArray[0] = wordArray[0].toLowerCase();
        return wordArray.join("");
    }
}
module.exports = Base;