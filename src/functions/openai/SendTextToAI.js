 import axios from 'axios';

const SendTextToAI = async (text) => {
    const apiKey = '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'; // Replace with your API key
    // const endpoint = 'https://api.openai.com/v1/gpt-3.5/analyze';
    const endpoint = 'http://localhost:8080/https://api.openai.com/v1/gpt-3.5/analyze';
    // const text = localStorage.getItem('textToAnalyze');

    // if (!text) {
    //     console.error('Text to analyze not found in local storage.');
    //     return null;
    // }


    try {
        const response = await axios.post(endpoint, {
            text: `write answer for this letter ${text}`,
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        console.log(response, response.data)

        return response.data;
    } catch (error) {
        console.error('Error sending request to the AI model:', error);
        return null;
    }
};

export default SendTextToAI;


//  const SendTextToAI = async (text) => {
//      try {
//          const response = await axios.post('/my-api/analyze', { text });
//          console.log(response.data);
//          return response.data;
//      } catch (error) {
//          console.error('Error sending request to the AI model:', error);
//          return null;
//      }
//  };
//
// export default SendTextToAI;
