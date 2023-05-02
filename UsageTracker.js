import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import cosmos from "@azure/cosmos";


// define the component
export class TestPlugIn extends LitElement {
  
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

  async init() {
    const { database } = await this.client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    return { database, container };
  }

  async addFormToCosmosDB(container, resources) {

    const doc = resources[0];
    const newForm = {
      formID: current_formId,
      user: current_user
    };
    doc.forms.push(newForm);
    const { resource: updatedDoc } = await container.items.upsert(doc);
    console.log("Dokument aktualisiert:", updatedDoc);
}

  async  addDocumentToDb(container){
    const newDocument = {
      id: current_workflowid,
      forms: [
        {
          formID: current_formId,
          user: current_user
        }
      ]
    };
    const { resource: createdDoc } = await container.items.create(newDocument);
    console.log("Neues Dokument erstellt:", createdDoc);
  }

  async queryDatabase(database, container){

  const querySpec = {
    query: "SELECT * FROM c WHERE c.id = @id ",
    parameters: [
      { name: "@id", value: current_workflowid }
    ]
  };

    const { resources: results } = await this.client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll()
    
  return results;
  }

  async saveToDatabase(jsonData){
    const {database, container} = await init();
    
    const item = {
      id: documentId,
      jsonData: JSON.stringify(jsonData)
    };

    const {resource} = await container.items.create(item);

    return resource;

  }


  async manager(idParam) {
    var formUser = "";
    const{database, container} = await init();
    const queryResults = await queryDatabase(database, container);

    if(queryResults.length > 0) {
      const doc = queryResults[0];
      const formExists = doc.forms.some(form => form.formID === current_formId);

      if(formExists){
        if (form.formID == current_formId) {
          formUser = form.user;
        }
      } else {
        addFormToCosmosDB(container, queryResults);
      }
    } else {
        addDocumentToDb(container);
    }
    
    return html`
                
            <div class="plyr__video-embed" id="player">
            <p>${formUser}<p/>

      `;
  } 
  
  constructor() {
    super();
    this.manager();
     const CosmosClient = cosmos.CosmosClient;
     this.client = new CosmosClient({ endpoint, key: apiKey });
  }

  

  render() {        

    return html`       
           ${this.manager()}      
    `;     

  }
  
}

// registering the web component
const elementName = 'dataone-test-plugin';
customElements.define(elementName, TestPlugIn);