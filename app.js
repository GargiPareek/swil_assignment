const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./router/userRouter');
const database = require("./database/dbconn")
const cors = require("cors")

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use('/v1', userRoutes);
database().then(() => {
    console.log('Database connected successfully');
  }).catch((error) => {
    console.error('Failed to connect to database:', error);
  });

  module.exports = app.listen(3000, () => {
    console.log('Server running on port 3000');
  });