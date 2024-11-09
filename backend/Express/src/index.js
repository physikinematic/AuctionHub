const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/../../.env' });
const dbConnection = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const auctionRoutes = require('./routes/auctionRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', auctionRoutes);

app.use((req, res) => {
  res.status(404).send('Not found');
});

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start the server:', err);
});