const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

const getRequestHandlers = {
  auction: require('./auction.js'),
  user: require('./user.js')
}

app.use(cors());
app.use(express.json());

app.get('/api/:param1/:param2', (req, res) => {
  const { param1, param2 } = req.params;
  try {
    if (getRequestHandlers[param1]) {
      const result = getRequestHandlers[param1](param2, req.query);
      res.json(result);
    } else {
      res.status(404).send('Invalid request');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});