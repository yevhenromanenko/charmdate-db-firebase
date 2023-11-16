// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// // const app = express();
//
//
// // Enable CORS to allow requests from your frontend
// app.use(cors());
//
// app.use(express.json());
//
// const apiKey = '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';
//
// app.post('/analyze', async (req, res) => {
//     try {
//         const { text } = req.body;
//
//         const response = await axios.post('https://api.openai.com/v1/gpt-3.5/analyze', {
//             text: `write answer for this letter ${text}`,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//             },
//         });
//
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error sending request to the AI model:', error);
//         res.status(500).json({ error: 'An error occurred while sending the request.' });
//     }
// });
//
// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// // });
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();
//
// // Enable CORS to allow requests from your frontend
// app.use(cors());
//
// app.use(express.json());
//
// const apiKey = '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';
//
// // Define a route for analyzing text
// app.post('/my-api/analyze', async (req, res) => {
//     try {
//         const { text } = req.body;
//
//         const response = await axios.post('https://api.openai.com/v1/gpt-3.5/analyze', {
//             text: `write answer for this letter ${text}`,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//             },
//         });
//
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error sending request to the AI model:', error);
//         res.status(500).json({ error: 'An error occurred while sending the request.' });
//     }
// });
//
// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// Listen on a specific host via the HOST environment variable
//

