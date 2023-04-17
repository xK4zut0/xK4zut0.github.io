import cosmos from "@azure/cosmos";

const CosmosClient = cosmos.CosmosClient;
const masterKey = "vES1Ej62YdDd98p79dritEkkD7Y7E5X2LAG1i30uq4PHqkHTfPU9Mdm8klOf9XvrBxGdeGNI0FTGACDbNXl91w==";
const endpoint = "https://usertrackingnintex.documents.azure.com:443/";

const client = new CosmosClient({ endpoint, key: masterKey });
const databaseId = "usertrackingnintexplugin";
const containerId = "usertracking";

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
        alert(`\tQuery returned ${resultString}\n`)
      }
       
}

async function init() {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    return { database, container };
}

queryItems1();