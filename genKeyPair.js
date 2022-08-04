const crypto = require('crypto');
const path = require('path');
const fs = require('fs');


const generateKey = () => {
    return crypto.generateKeyPairSync('ec', {
        namedCurve: 'sect239k1',

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })
};


// Generate Refresh Token key
const refreshTokenKey = generateKey();

fs.writeFileSync(path.resolve('secretKeys/refreshTokenECPublic.pem'), refreshTokenKey.publicKey, 'utf8');
fs.writeFileSync(path.resolve('secretKeys/refreshTokenECPrivate.pem'), refreshTokenKey.privateKey, 'utf8');


// Generate Access Token key
const accessTokenKey = generateKey();

fs.writeFileSync(path.resolve('secretKeys/accessTokenECPublic.pem'), accessTokenKey.publicKey, 'utf8');
fs.writeFileSync(path.resolve('secretKeys/accessTokenECPrivate.pem'), accessTokenKey.privateKey, 'utf8');

console.log('\x1b[32m%s\x1b[0m', `${refreshTokenKey.publicKey}\n${refreshTokenKey.privateKey}`);
console.log('\x1b[32m%s\x1b[0m', `${accessTokenKey.publicKey}\n${accessTokenKey.privateKey}`);
