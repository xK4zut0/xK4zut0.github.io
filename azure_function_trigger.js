import crypto from 'crypto'
import config from './config.js'
import https from 'https'

const {cosmosDatabase: {configMasterKey, configEndpoint, configDatabaseId, configContainerId}} = config

const functionKey = "asdb123l8asjvnmfj!19239asdkkslad8asdl;k1238";
const truncatedKey = Buffer.from(functionKey, 'utf8').slice(0, 32);


function encryptData(data, key){
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  // Encrypt the data and concatenate with the IV
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  // Return the encrypted data and IV as Base64-encoded strings
  return { encryptedData: encrypted.toString('base64'), iv: iv.toString('base64') };
}

const credentials = {
    masterKey: configMasterKey,
    endpoint: configEndpoint,
    databaseId: configDatabaseId,
    containerId: configContainerId
};

const encrypted = encryptData(JSON.stringify(credentials), truncatedKey);

const postData = JSON.stringify({ data: encrypted.encryptedData, iv: encrypted.iv });
const options = {
    hostname: 'querycosmos.azurewebsites.net',
    path: '/api/QueryFormsUser',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'x-functions-key': '6hZ1MQ_7KVTytbzbD3Ve8RFp4mOzT0qNcXYShINPv4faAzFubI5kEA=='
    }
};

const req = https.request(options, res =>{
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d =>{
        process.stdout.write(d);
    });
});

req.on('error', error => {
    console.error(error);
});

req.write(postData);
req.end();