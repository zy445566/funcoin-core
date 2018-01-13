const config = require("../config");
const level = require('level');
const db =  level(config.dataPath);
class Database{
    constructor()
    {
        this.db =  db;
    }

    open()
    {
        return new Promise((reslove,reject)=>{
            if(this.isOpen()){reslove(true);}
            this.db.open((err)=>{
                if(err)reject(err);
                reslove(true);
            });
        }); 
    }

    close()
    {
        return new Promise((reslove,reject)=>{
            if(this.isClose()){reslove(true);}
            this.db.close((err)=>{
                if(err)reject(err);
                reslove(true);
            });
        }); 
    }

    isOpen()
    {
        return this.db.isOpen();
    }

    isClose()
    {
        return this.db.isClose();
    }

    get(key)
    {
        return new Promise((reslove,reject)=>{
            this.db.get(key,  (err, value)=>{
                if(err)reject(err);
                reslove(JSON.parse(value));
            });
        });
    }

    put(key,value)
    {
        return new Promise((reslove,reject)=>{
            this.db.put(key, JSON.stringify(value),  (err)=>{
                if(err)reject(err);
                reslove(true);
            });
        });
    }

    del(key)
    {
        return new Promise((reslove,reject)=>{
            this.db.del(key,  (err)=>{
                if(err)reject(err);
                reslove(true);
            });
        });
    }

    getList(options)
    {
        let list = [];
        return new Promise((reslove,reject)=>{
            this.db.createReadStream()
            .on('data', (data) => {
                list.push(JSON.parse(data.value));
            })
            .on('error', (err) => {
                reject(err);
            })
            .on('end', () => {
                reslove(list);
            })
        }); 
    }

}
module.exports = Database;