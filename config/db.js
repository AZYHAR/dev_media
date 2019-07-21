const mongoose = require('mongoose'); // using to connect
const config = require('config'); // grab string from default.json
const db = config.get('mongoURI'); // to get db value from json

// Connect to mongoDB
// async, await => new standart + cleaner
const connectDB = async () => {
  // Error handling
  try {
    await mongoose.connect(db, {
      // returns a promise
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with falure
    process.exit(1);
  }
};

module.exports = connectDB;
