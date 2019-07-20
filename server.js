const express = require('express');

const app = express();


app.get('/', (req, res) => res.send('API is runnung'))

// will look for envieront variable called port 
// to use when we will deploy heroku
// locally runs on port 5000
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));