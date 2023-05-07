import cosmos from 'https://cdn.jsdelivr.net/npm/@azure/cosmos@3.17.3/dist/index.min.js';
import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class TestPlugin extends LitElement {

    static userOnForm = "No User";

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
        },
        value: {
          title: 'Aktueller Benutzer',
          type: 'string',
          isValueField: true, 
        }            
      },
      events: ["ntx-value-change"],
    };
  }

    async init() {
        const CosmosClient = cosmos.CosmosClient;
        const client = new CosmosClient({ endpoint: this.endpoint, key: this.masterKey });
        const { database } = await client.databases.createIfNotExists({ id: this.databaseId });
        const { container } = await database.containers.createIfNotExists({ id: this.containerId });
        return { database, container, client};
    }

    async queryDatabase(database, container, client){

        const querySpec = {
            query: "SELECT * FROM c WHERE c.id = @id ",
            parameters: [
            { name: "@id", value: this.current_workflowid }
            ]
        };

        const { resources: results } = await client
        .database(this.databaseId)
        .container(this.containerId)
        .items.query(querySpec)
        .fetchAll()
        
        return results;
    }

    async addFormToCosmosDB(container, resources) {

        const doc = resources[0];
        const newForm = {
        formID: this.current_formId,
        user: this.current_user
        };
        doc.forms.push(newForm);
        const { resource: updatedDoc } = await container.items.upsert(doc);
    }

    async  addDocumentToDb(container){
        const newDocument = {
        id: this.current_workflowid,
        forms: [
            {
            formID: this.current_formId,
            user: this.current_user
            }
        ]
        };
        const { resource: createdDoc } = await container.items.create(newDocument);
    }

    async manager() {
        const{database, container, client} = await this.init();
        const queryResults = await this.queryDatabase(database, container, client, this.databaseId, this.containerId);

        if(queryResults.length > 0) {
            const doc = queryResults[0];
            const formExists = doc.forms.some(form => form.formID === this.current_formId);

            if(formExists){
                queryResults[0].forms.forEach(form => {
                    if (form.formID == this.current_formId){
                        TestPlugin.userOnForm = form.user;
                    }
                });
            } else {
                this.addFormToCosmosDB(container, queryResults);
            }
        } else {
            this.addDocumentToDb(container);
        }
    } 
    
    constructor(){
        super();
        this.manager();
    }
    
    render() {
        return html `<p>Dieser User arbeitet gerade auf dem Formular ${TestPlugin.userOnForm}</p>`;
    }
}

// registering the web component
const elementName = 'dataone-usagetrackerv3-plugin';
customElements.define(elementName, TestPlugin);