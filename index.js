import cosmos from "@azure/cosmos";
import config from './config.js'

const CosmosClient = cosmos.CosmosClient;
const { cosmosDatabase: {masterKey, endpoint, databaseId, containerId}} = config;
const client = new CosmosClient({ endpoint, key: masterKey });

async function queryItems1(idParam) {
    const { container, database } = await init();

    const querySpec = {
        query: " SELECT f.forms[0].formID FROM usertracking f WHERE f.id = 'abc1'" 
        };

        const { resources: results } = await client
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll()
        
      for (var queryResult of results) {
        let resultString = JSON.stringify(queryResult)
        console.log(`\tQuery returned ${resultString}\n`)
      }
       
}

async function init() {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    return { database, container };
}

queryItems1();