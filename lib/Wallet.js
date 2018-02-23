const crypto = require('crypto');
const ecEncodeName = "secp256k1";
const ec = new require("elliptic").ec(ecEncodeName);
const Secret = require('./Secret');

class Wallet
{
    constructor()
    {
        this.walletInstance = crypto.createECDH(ecEncodeName);
        this.urlPrefix ="Funcoin://"
    }
/**
 * GET
 */
    getPublicKey(encoding = 'hex')
    {
        return this.walletInstance.getPublicKey(encoding);
    }

    getPrivateKey(encoding = 'hex')
    {
        return this.walletInstance.getPrivateKey(encoding);
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
    setPrivateKey(privateKey,encoding = 'hex')
    {
        return this.walletInstance.setPrivateKey(privateKey,encoding);
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
            Secret.text2Hex(seed)
        );
    }
/**
 * consensus
 */
    computeSecret(othersPublicKey,inputEncoding = 'hex',outputEncoding = 'hex')
    {
        return this.walletInstance.computeSecret(othersPublicKey,inputEncoding,outputEncoding);
    }
/**
 * sign
 */
    sign(msg,encoding = 'hex')
    {
        let buffer = Buffer.from(ec.sign(msg, this.getPrivateKey(), {canonical: true}).toDER());
        if (['latin1','base64','hex'].indexOf(encoding)>-1){return buffer.toString(encoding)}
        return buffer;
    }

/**
 * verify
 */
    verify(msg,signature,otherPublicKey,signatureEncoding='hex',otherPublicKeyEncoding='hex')
    {
        return ec.verify(msg, Buffer.from(signature,signatureEncoding), Buffer.from(otherPublicKey,otherPublicKeyEncoding));
    }

}

module.exports = Wallet;