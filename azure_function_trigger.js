import crypto from 'crypto'
import config from './config.js'
import https from 'https'

const {cosmosDatabase: {configMasterKey, configEndpoint, configDatabaseId, configContainerId, configFunctionKey, configEncryptionKey}} = config

const encryptionKey = configEncryptionKey;

// Create a buffer from the original key
let keyBuffer = Buffer.from(encryptionKey, 'utf8');

// The desired key length (in bytes)
const desiredKeyLength = 32; // 256 bits

// If the key length is too short, pad the buffer with zeroes
if (keyBuffer.length < desiredKeyLength) {
  const paddedBuffer = Buffer.alloc(desiredKeyLength);
  keyBuffer.copy(paddedBuffer);
  keyBuffer = paddedBuffer;
}

// If the key length is too long, truncate the buffer
if (keyBuffer.length > desiredKeyLength) {
  keyBuffer = keyBuffer.slice(0, desiredKeyLength);
}



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
    containerId: configContainerId,
    current_formId: "abcdee1",
    current_user: "aj",
    current_workflowId: "abcee1"
};

const encrypted = encryptData(JSON.stringify(credentials), keyBuffer);

const postData = JSON.stringify({ data: encrypted.encryptedData, iv: encrypted.iv });
const options = {
    hostname: 'querycosmos.azurewebsites.net',
    path: '/api/QueryFormsUser',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'x-functions-key': configFunctionKey
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