import cosmos, { CosmosClient } from "@azure/cosmos";
import config from './config.js'

export class TestPlugin {

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

    async init() {
        const { cosmosDatabase: {configMasterKey, configEndpoint, configDatabaseId, configContainerId}} = config;
        this.apiKey = configMasterKey;
        this.endpoint = configEndpoint;
        this.databaseId = configDatabaseId;
        this.containerId  = configContainerId;
        this.current_workflowid = "abc1";
        this.current_formId = "abcde1";
        this.current_user = "aj";

        const CosmosClient = cosmos.CosmosClient;
        const client = new CosmosClient({ endpoint: this.endpoint, key: this.apiKey });
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

        console.log(TestPlugin.userOnForm);
    } 
    
    constructor(){
        this.manager();
    }
}

const something = new TestPlugin();