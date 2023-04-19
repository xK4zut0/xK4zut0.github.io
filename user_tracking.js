import {LitElement, html} from "lit";
//import cosmos from "@azure/cosmos";
//import config from './config.js'

export default class FormUsageTracker extends LitElement{

    static properties = {
        returnString: {type: String},
    };

    // async init() {
    //     const CosmosClient = cosmos.CosmosClient;
    //     const { cosmosDatabase: {masterKey, endpoint, databaseId, containerId}} = config;
    //     const client = new CosmosClient({ endpoint, key: masterKey });
    //     return { database, container, client, databaseId, containerId};
    // }

    // async queryItems(idParam) {
    //     const { container, database, client, databaseId, containerId } = await this.init();

    //     const querySpec = {
    //         query: " SELECT f.forms[0].formID FROM usertracking f WHERE f.id = 'abc1'" 
    //         };

    //         const { resources: results } = await client
    //         .database(databaseId)
    //         .container(containerId)
    //         .items.query(querySpec)
    //         .fetchAll()
            
    //     for (var queryResult of results) {
    //         let resultString = JSON.stringify(queryResult)
    //          console.log(typeof(resultString));
             
    //     }

    //     const event = new CustomEvent('ntx-value-change', resultString);
    //     this.dispatchEvent(event);

    //     return resultString;
       
    // }


    static getMetaConfig() {
        return {
            controlName: 'Form Usage Tracker',
            fallbackDisableSubmit: false,
            version: '1.0',
            properties: {
                value: {
                    type: 'string',
                    title: 'Value',
                    isValueField: true
                },
            },
            events: ["ntx-value-change"],
        };
    } 

    constructor(){
        super();
        this.returnString = "fun";
    }

    render() {
        return html`<p> Result is  ${this.returnString}<p/>`;
    }

    
}

const elementName = 'form-usage-tracker';
customElements.define(elementName, FormUsageTracker);