require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const routeIndex = require('./routes/index.router');

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ content: 'welcome' }));
app.use(cors());
app.use(passport.initialize());
app.use('/api', routeIndex);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running at port: ${process.env.PORT}`)
);
