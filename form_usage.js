export class FormUsagePlugin {

    static properties = {
        masterKey: {type: String}, 
        endpoint: {type: String},
        databaseId: {type: String},
        containerId: {type: String}        
      }; 

      static getMetaConfig() {
        return {
          controlName: 'Form Usage',
          fallbackDisableSubmit: false,
          groupName: 'User Tracking',
          version: '1.2',
          pluginAuthor: 'Aljoscha Power',
          properties: {
            masterKey: {
              type: 'string',
              title: 'Database  Master-Key',
              description: 'Please enter the Master-Key of the database'
            },
            
            endpoint: {
              type: 'string',
              title: 'Endpoint',
              description: 'Please enter the endpoint of your azure database'
            },
            databaseId: {
              title: 'Database-ID',
              type: 'string',
              description: 'Please enter the Id of your database'
            },
            containerId: {
              title: 'Container ID',
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
const elementName = 'form-usage';
customElements.define(elementName, FormUsagePlugin);