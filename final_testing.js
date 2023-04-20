export class MapsPlugin{
  
  static properties = {
    apiKey: {type: String}  
  }; 

  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Maps Canvas',
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

  constructor() {
    super();
    
  }
  
}

// registering the web component
const elementName = 'maps-plugin';
customElements.define(elementName, MapsPlugin);