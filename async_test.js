import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import cosmos, { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.3.0/dist/cosmos-browser.umd.min.js";

export class TestPlugin extends LitElement {

    static userOnForm = "No User";
    static littleTest = 0;

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
        }         
      }
    };
  }

  async test(){
    TestPlugin.userOnForm = await this.changeUser();
  }
  async connectedCallback() {
    const client = new CosmosClient({ endpoint: this.endpoint, masterkey:  this.apiKey });
    const { database } = await client.databases.createIfNotExists({ id: this.databaseId });
    const { container } = await database.containers.createIfNotExists({ id: this.containerId });
    
    if(container){
      TestPlugin.userOnForm = "connected successfully";
    } else {
        TestPlugin.userOnForm = "Not connected"; 
    }
  }
    
    constructor(){
        super();
    }
    
    render() {
        return html `<p>Dieser User arbeitet gerade auf dem Formular ${TestPlugin.userOnForm}</p>`;
    }
}

// registering the web component
const elementName = 'dataone-tracker-plugin';
customElements.define(elementName, TestPlugin);