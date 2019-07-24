const express = require('express');
const connectDB = require('./config/db'); // Valid connection
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false
  })
);

// app.get('/', (req, res) => res.send('API is runnung'))

// Define Routes
// Redirect request to folder
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

// ? Backend setup
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // Serve html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// will look for envieront variable called port
// to use when we will deploy heroku
// locally runs on port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
