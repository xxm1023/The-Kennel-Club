const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const SECRET_KEY = 'GoldenRetrieverPedigreeSecret976'; 
const IV = '1976203901266242'; 

const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'dogs.json'), 'utf8'));

function encryptObject(obj) {
    const jsonStr = JSON.stringify(obj);
    const encrypted = CryptoJS.AES.encrypt(jsonStr, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

const encryptedData = {};
for (const [id, dog] of Object.entries(rawData)) {
    encryptedData[id] = encryptObject(dog);
}

fs.writeFileSync(
    path.join(__dirname, 'data', 'dogs.crypt.json'),
    JSON.stringify(encryptedData, null, 2)
);