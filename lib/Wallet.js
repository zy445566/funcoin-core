const crypto = require('crypto');
const Secret = require('./Secret');
class Wallet
{
    constructor()
    {
        this.walletInstance = crypto.createECDH('secp521r1');
        this.urlPrefix ="Funcoin://"
    }
/**
 * GET
 */
    getPublicKey()
    {
        return this.walletInstance.getPublicKey('hex');
    }

    getPrivateKey()
    {
        return this.walletInstance.getPrivateKey('hex');
    }

    getWalletAddress()
    {
        return Secret.hex2Base58(this.getPublicKey());
    }

    getWalletUrl()
    {
        return this.urlPrefix+this.getWalletAddress();
    }
/**
 * SET
 */
    setPrivateKey(privateKey)
    {
        return this.walletInstance.setPrivateKey(privateKey,"hex");
    }
/**
 * GEN
 */
    generateKeys()
    {
        this.walletInstance.generateKeys();
    }

    generateKeysBySeed(seed)
    {
        this.walletInstance.setPrivateKey(
            crypto.createHash('sha256').update(seed, 'utf8').digest()
        );
    }
/**
 * consensus
 */
    computeSecret(othersPublicKey)
    {
        return computeSecret(othersPublicKey,'hex','hex');
    }

}

module.exports = Wallet;