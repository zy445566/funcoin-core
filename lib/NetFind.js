const interfaces = require('os').networkInterfaces();  
class NetFind{
    ping()
    {

    }

    store()
    {

    }

    findNode()
    {

    }

    findValue()
    {

    }

    getIdNumber(ip)
    {
        let ipArray = ip.split('.');
        let IdNumber = 256*256*256*ipArray[0]+256*256*ipArray[1]+256*ipArray[2]+ipArray[3];
        return IdNumber;
    }

    static getSelfIp()
    {
        for(let devName in interfaces){  
                let iface = interfaces[devName];  
                for(let alias of iface){  
                    if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                            return alias.address;  
                    }  
                }  
        }
        return '127.0.0.1';
    }
}

module.exports = NetFind;