import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class UsagePlugin extends LitElement{
  
  static properties = {
    masterKey: {type: String},  
    endpoint: {type: String},
    databaseId: {type: String},
    containerId: {type: String}
  }; 

  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'User Tracking',
      fallbackDisableSubmit: false,
      groupName: 'Tracking',
      version: '1.0.0',
      pluginAuthor: 'Aljoscha Power',
      properties: {
        masterKey: {
            title: 'a',
            type: 'string',
            description: 'Please enter the Master Key of the database'
          },
          
        endpoint: {
            type: 'string',
            title: 'endpoint',
            description: 'Please enter the endpoint of your azure database'
        },
        databaseId: {
            title: 'b',
            type: 'string',
            description: 'Please enter the Id of your database'
        },
        containerId: {
            title: 'c',
            type: 'string',
            description: 'Please enter the Id of your container'
        }        
      }
    };
  }

  constructor() {
    super();
    
  }

  render() {        

    
    return html`<p>Hello World<p/>`;     

  }
  
}

// registering the web component
const elementName = 'formusage-plugin';
customElements.define(elementName, UsagePlugin);