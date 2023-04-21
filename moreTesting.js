// define the component
export class DirectionsPlugin {
  
  static properties = {
    apiKey: {type: String}
    
  }; 
 
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Maps Directions',
      fallbackDisableSubmit: false,
      groupName: 'Google Maps',
      version: '1.2',
      pluginAuthor: 'Sven Berling',
      properties: {
        apiKey: {
          type: 'string',
          title: 'API Key',
          description: 'Please enter your Google API Key'
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