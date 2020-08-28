const express = require('express');
const cors = require('cors');
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

module.exports = server;
