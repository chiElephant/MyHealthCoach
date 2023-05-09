const express = require('express');
const error = require('./middleware/error');
const routes = require('./routes/index');
const db = require('./db');
const { ENV } = require('./config');
const app = express();
const cors = require('cors');

if (ENV === 'production') db.testConnection();

app.use(express.json());
app.use(cors());

app.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

//routes
app.use('/user', routes.user);
app.use('/overview', routes.overview);
app.use('/exercise', routes.exercise);
app.use('/nutrition', routes.nutrition);
app.use('/report', routes.report);

//error handling middelware
app.use(error);

module.exports = app;
