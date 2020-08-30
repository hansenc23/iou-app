const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { mongoUri } = require('./config/config');
const app = express();

//CORS
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    username: 'Hansen',
    password: 'test123',
  });
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = server;
