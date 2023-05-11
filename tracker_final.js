import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import crypto from 'crypto'

export class TestPlugin extends LitElement {

    static properties = {
        apiKey: {type: String},
        endpoint: {type: String},
        databaseId: {type: String},
        containerId: {type: String},
        current_workflowid: {type: String},
        current_formId: {type: String},
        current_user: {type: String}
    };

    // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Usage Tracker',
      fallbackDisableSubmit: false,
      groupName: 'Useractivity',
      version: '1.2',
      properties: {
        apiKey: {
          type: 'string',
          title: 'API Key',
          description: 'Api key to database'
        },       
        endpoint: {
          title: 'endpoint',
          type: 'string'
        },  
        databaseId: {
            title: 'databaseId',
            type: 'string'
        },
        containerId: {
            title: 'containerId',
            type: 'string'
        },
        current_workflowid: {
          title: 'workflowId',
          type: 'string'
        },
        current_formId: {
          title: 'formId',
          type: 'string'
        },
        current_user: {
          title: 'user',
          type: 'string'
        }, 
        encryptionKey: {
          title: 'encryptionKey',
          type: 'string'
        }            
      }
    };
  }

  test() {
    if(this.encryptionKey){
      return html `${this.manager()}`;
    } else {
      return html `please pass in an encryption key`;
    }

    return html `nothing to show`;
  }

   async manager() {

    // Create a buffer from the original key
    let keyBuffer = Buffer.from(this.encryptionKey, 'utf8');

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

    const credentials = {
      masterKey: "hi"
    };

    const result = this.encryptData(credentials, keyBuffer);

    return html `Verschluesselte Daten ${result}`;
  }  



   encryptData(data, key){

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the data and concatenate with the IV
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    // Return the encrypted data and IV as Base64-encoded strings
    return { encryptedData: encrypted.toString('base64'), iv: iv.toString('base64') };
  } 

    constructor(){
        super();
        this.test()
    }
    
    render() {
      return html`       
        
        ${this.test()}
     
      `;  
    }
}

// registering the web component
const elementName = 'dataone-trackingtestv6-plugin';
customElements.define(elementName, TestPlugin);