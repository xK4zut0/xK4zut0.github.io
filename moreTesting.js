// define the component
export class DirectionsPlugin {
  
  static properties = {
    apiKey: {type: String},
    endpoint: {type: String},
    databaseId: {type: String},
    containerId: {type: String}
    
  }; 
 
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Usage Tracker',
      fallbackDisableSubmit: false,
      groupName: 'Google Maps',
      version: '1.2',
      pluginAuthor: 'Aljoscha Power',
      properties: {
        apiKey: {
          type: 'string',
          title: 'API Key',
          description: 'Please enter your Google API Key'
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
  constructor(){
    super();
  }
}

// registering the web component
const elementName = 'example-plugin';
customElements.define(elementName, DirectionsPlugin);