import config from './config.js'

const host = 'https://usertrackingnintex.documents.azure.com';
const { cosmosDatabase: {masterKey, endpoint, databaseId, containerId}} = config;
const query = 'SELECT * FROM c WHERE c.id = abc1';

async function queryCosmosDB(cosmosDBUrl, databaseName, collectionName, query) {
    const endpoint = `${cosmosDBUrl}/dbs/${databaseName}/colls/${collectionName}/docs`;
    const headers = {
        'Content-Type': 'application/query+json',
        'Authorization': `type=master&ver=1.0&sig=`,
        'x-ms-version': '2018-12-31'
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: query })
    });
    
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to query CosmosDB: ${errorResponse.message}`);
    }
    
    const results = await response.json();
    return results;
}

const test = queryCosmosDB(host, databaseId, containerId, query);
console.log(test);