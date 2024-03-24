const mongoose = require('mongoose');

const connectToDatabase = async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/swil_assignment_database')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
};

module.exports = connectToDatabase;
