import { html,LitElement} from 'lit' //from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import crypto from 'crypto-browserify';
import { Buffer } from 'buffer';

export class TestPlugin extends LitElement {

    static properties = {
        apiKey: {type: String},
        endpoint: {type: String},
        databaseId: {type: String},
        containerId: {type: String},
        current_workflowid: {type: String},
        current_formId: {type: String},
        current_user: {type: String},
        responseData: {type:String}
    };

    // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Usage Tracker',
      fallbackDisableSubmit: false,
      groupName: 'Useractivity',
      version: '1.2',
      properties: {
        current_workflowid: {
          title: 'workflowId',
          type: 'string'
        },
        current_formid: {
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

  test() {
    if(this.current_workflowid && this.current_formid && this.current_user){
      return html `${this.responseData}`;
    } else {
      return html `please enter the required information`;
    }
  }

  fetchData() {
    const dataToSend = {
      current_workflowId: this.current_workflowid,
      current_formId: this.current_formid,
      current_user: this.current_user
    }

    fetch('https://querycosmos.azurewebsites.net/api/QueryFormsUserv2', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
          'x-functions-key': "sXpaDYLLQyviWvUvpsOMnJpvcRf0TK6h0lu6PLc-ZgXnAzFup0u2yA=="
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the response data as JSON
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        this.responseData = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

    constructor(){
        super();
        this.test()
    }
    
    render() {
      return html`       
        
        ${this.test()}
     
      `;  
    }
}

// registering the web component
const elementName = 'dataone-trackingtestv8-plugin';
customElements.define(elementName, TestPlugin);