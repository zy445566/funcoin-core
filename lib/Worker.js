const config = require("../config");
class Worker{
    constructor()
    {
        this.prompt = config.godBlock.prompt;
        this.valid = new RegExp(`/^0{${config.godBlock.difficulty}}[0-9a-fA-F]+$/`);
    }

    getAnswerHex(index)
    {
        return crypto.createHash('sha256').update(`${this.prompt}${index}`, 'utf8').digest();
    }

    getAnswer()
    {
        let answer = {hex:'',index:0};
        while(!this.valid.test(answer.hex))
        {
            answer.hex = this.getAnswerHex(answer.index);
            answer.index++;
            console.log(answer);
        }
        return answer;
    }

    validAnswer(answer)
    {
        if(this.valid.test(answer.hex))
        {
            if(answer.hex == this.getAnswerHex(answer.index))
            {
                return true;
            }
        }
        return false;
    }
}

module.exports = Worker;