import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

export class TestPlugin extends LitElement {

    static properties = {
        current_workflowId_field: {type: String},
        current_formId_field: {type: String},
        current_user_field: {type: String},
        function_key: {type: String}
    };

    // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Usage Tracker',
      fallbackDisableSubmit: false,
      groupName: 'Useractivity',
      version: '1.2',
      properties: {
        current_workflowId_field: {
          title: 'workflowId',
          type: 'string'
        },
        current_formId_field: {
          title: 'formId',
          type: 'string'
        },
        current_user_field: {
          title: 'user',
          type: 'string'
        },
        function_key: {
          title: 'Funktions Key',
          type: 'string'
        }   
      }
    };
  }

  test() {
    if(this.current_workflowId_field && this.current_formId_field && this.current_user_field){
      return html `${this.fetchData()}`;
    } else {
      return html `please enter the required information`;
    }
  }
  

  fetchData() {
    const dataToSend = {
      current_workflowId: this.current_workflowId_field,
      current_formId: this.current_formId_field,
      current_user: this.current_user_field
    }

    fetch('https://querycosmos.azurewebsites.net/api/QueryFormsUserv2', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
          'x-functions-key': this.function_key
        }
      })
      .then(response => {
        if (response.ok) {
          return html `response was ok`;
        } else {
          return html `something went wrong with the response`;
        }
      })
      .then(data => {
        return html `there was data`;
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
const elementName = 'dataone-trackingtestv22-plugin';
customElements.define(elementName, TestPlugin);