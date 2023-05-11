
  class MyClass {
    constructor() {
      this.responseData = null;
    }
  
    sendRequest() {
      const dataToSend = {
        current_workflowId: "abc1",
        current_formId: "abcd1",
        current_user: "aj"
      };
  
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
        console.log('Response data:', data);
        // Assign the parsed response data to the class property
        this.responseData = data;
        console.log('Response data assigned to variable:', this.responseData);
  
        // Call a method that uses the response data
        this.useResponseData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  
    useResponseData() {
      // Use the response data here
      console.log('Response data being used:', this.responseData);
    }
  }
  
  const myClassInstance = new MyClass();
  myClassInstance.sendRequest();
  