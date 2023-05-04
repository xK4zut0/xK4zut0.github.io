import cosmos from "@azure/cosmos";
import config from './config.js';
import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class TestPlugin extends LitElement {
    
    static userOnForm = "No User";
    static current_formId = 'abcd3';
    static current_workflowid = 'abc4';
    static current_user = 'aj';

    async init() {
        const CosmosClient = cosmos.CosmosClient;
        const { cosmosDatabase: {masterKey, endpoint, databaseId, containerId}} = config;
        const client = new CosmosClient({ endpoint, key: masterKey });
        const { database } = await client.databases.createIfNotExists({ id: databaseId });
        const { container } = await database.containers.createIfNotExists({ id: containerId });
        return { database, container, client, databaseId, containerId};
    }

    async queryDatabase(database, container, client, databaseId, containerId){

        const querySpec = {
            query: "SELECT * FROM c WHERE c.id = @id ",
            parameters: [
            { name: "@id", value: TestPlugin.current_workflowid }
            ]
        };

        const { resources: results } = await client
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll()
        
        return results;
    }

    async addFormToCosmosDB(container, resources) {

        const doc = resources[0];
        const newForm = {
        formID: TestPlugin.current_formId,
        user: TestPlugin.current_user
        };
        doc.forms.push(newForm);
        const { resource: updatedDoc } = await container.items.upsert(doc);
        console.log("Dokument aktualisiert:", updatedDoc);
    }

    async  addDocumentToDb(container){
        const newDocument = {
        id: TestPlugin.current_workflowid,
        forms: [
            {
            formID: TestPlugin.current_formId,
            user: TestPlugin.current_user
            }
        ]
        };
        const { resource: createdDoc } = await container.items.create(newDocument);
        console.log("Neues Dokument erstellt:", createdDoc);
    }

 
    async manager(idParam) {
        const{database, container, client, databaseId, containerId} = await this.init();
        const queryResults = await this.queryDatabase(database, container, client, databaseId, containerId);

        if(queryResults.length > 0) {
            const doc = queryResults[0];
            const formExists = doc.forms.some(form => form.formID === TestPlugin.current_formId);

            if(formExists){
                queryResults[0].forms.forEach(form => {
                    if (form.formID == TestPlugin.current_formId){
                        TestPlugin.userOnForm = form.user;
                    }
                });
            } else {
                this.addFormToCosmosDB(container, queryResults);
            }
        } else {
            this.addDocumentToDb(container);
        }

        console.log(TestPlugin.userOnForm);
    } 
    
    constructor() {
        this.manager();
    }
    
    render() {
        return html `<p>Dieser User arbeitet gerade auf dem Formular</p>`;
    }
}

customElements.define('test-plugin', TestPlugin);