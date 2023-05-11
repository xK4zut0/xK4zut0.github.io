import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

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

  manager() {
    return html `${this.encryptionKey}`;
  } 

    constructor(){
        super();
        this.test
    }
    
    render() {
      return html`       
        
        ${this.test()}
     
      `;  
    }
}

// registering the web component
const elementName = 'dataone-trackingtestv4-plugin';
customElements.define(elementName, TestPlugin);