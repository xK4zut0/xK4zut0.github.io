// define the component
export class UsagePlugin {
  
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
        groupName: 'Benutzunganalyse',
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
  }
  
  // registering the web component
  const elementName = 'dataone-plugin';
  customElements.define(elementName, UsagePlugin);