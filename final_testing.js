export class MapsPlugin{
  
  static properties = {
    apiKey: {type: String},
    endpoint: {type: String} 
  }; 

  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'User Tracking',
      fallbackDisableSubmit: false,
      groupName: 'Tracking',
      version: '1.2',
      pluginAuthor: 'Aljoscha Power',
      properties: {
        apiKey: {
            type: 'string',
            title: 'API Key',
            description: 'Please enter your Database API Key'
        },
        endpoint: {
            type: 'string',
            title: 'Endpoint',
            description: 'Type in your endpoint'
        }        
      }
    };
  }

  constructor() {
    super();
    
  }
  
}

// registering the web component
const elementName = 'maps-plugin';
customElements.define(elementName, MapsPlugin);