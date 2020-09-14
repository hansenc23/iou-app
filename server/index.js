require('dotenv').config({ path: './server/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes');
const db = require('./db');

const app = express();

// Check database connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middlewares
// app.use(
//   cors({
//     credentials: true,
//   })
// );
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/', routes);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
