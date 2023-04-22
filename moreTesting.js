import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


// define the component
export class MediaPlayerPlugIn extends LitElement {
  
  static properties = {
    apiKey: {type: String},
    endpoint: {type: String},
    databaseId: {type: String},
    containerId: {type: String} 
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
        }         
        
      }
    };
  }


  checkAdress() {
     
     if(this.videosrc) {
         
      
      return html`
                
            <div class="plyr__video-embed" id="player">
            <p>Sample<p/>

      `;
    
    }
    else {      
      return html`
        <p>Bitte geben Sie ein Video ein / Please enter a source </p>  
      `;   
    }
  }     
  

  
  constructor() {
    super();
    this.checkAdress(); 
    
  }

  

  render() {        

    
    return html`       
           ${this.checkAdress()}      
    `;     

  }
  
}

// registering the web component
const elementName = 'dataone-example-plugin';
customElements.define(elementName, MediaPlayerPlugIn);