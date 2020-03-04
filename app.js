require('./config/config');
require('./models/db');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ content: 'welcome' }));
app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`Server running at port: ${process.env.PORT}`)
);
