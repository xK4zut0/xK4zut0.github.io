import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import cosmos, { CosmosClient } from "@azure/cosmos";
import config from './config.js'

export class TestPlugin extends LitElement {

  static formUser = "No User";
  static current_formId = 'abcd1';
  static current_workflowid = 'abc1';
  static current_user = 'aj';

  async init() {
    const CosmosClient = cosmos.CosmosClient;
    const { cosmosDatabase: {masterKey, endpoint, databaseId, containerId}} = config;
    const client = new CosmosClient({ endpoint, key: masterKey });
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });

    return { database, container, client, databaseId, containerId};
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

  async queryDatabase(database, container, client, databaseId, containerId){

  const querySpec = {
    query: "SELECT * FROM c WHERE c.id = @id ",
    parameters: [
      { name: "@id", value: TestPlugin.current_workflowid }
    ]
  };

    const { resources: results } = await this.client
    .database()
    .container()
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
    const{database, container} = await init();
    const queryResults = await queryDatabase(database, container);

    if(queryResults.length > 0) {
      const doc = queryResults[0];
      const formExists = doc.forms.some(form => form.formID === current_formId);

      if(formExists){
        if (form.formID == current_formId) {
          formUser = form.user;
        }
        const event = new CustomEvent('ntx-value-change', formUser);
        this.dispatchEvent(event);
      } else {
        addFormToCosmosDB(container, queryResults);
      }
    } else {
        addDocumentToDb(container);
    }
    
    return formUser;
  } 
  
  constructor() {
    super();
    this.manager();
  }

  

  render() {        

    return html`       
           ${this.manager()}      
    `;     

  }
  
}

// registering the web component
const elementName = 'dataone-usagetrackerv3-plugin';
customElements.define(elementName, TestPlugin);