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
app.listen(port, () => {
  console.log(`Listening in port ${port}...`);
});
