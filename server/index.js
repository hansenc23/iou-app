require('dotenv').config({ path: './server/.env' })
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const routes = require('./routes')
const db = require('./db/index')

const app = express();
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Middlewares
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Use routes
app.use('/', routes)

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
