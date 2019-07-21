const express = require('express');
const connectDB = require('./config/db'); // Valid connection

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({
    extended: false
}));

app.get('/', (req, res) => res.send('API is runnung'))


// Define Routes
// Redirect request to folder
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/users', require('./routes/api/users'))

// will look for envieront variable called port 
// to use when we will deploy heroku
// locally runs on port 5000
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));