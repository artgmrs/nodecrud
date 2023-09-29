require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

// local imports
const connectDb = require('./db.js');
const employeeRoute = require('./controllers/employee.controller.js');
const { errorHandler } = require('./middlewares');

const app = express();

// midlewares
app.use(bodyParser.json());
app.use('/api/employees', employeeRoute);
app.use(errorHandler);

connectDb()
  .then(() => {
    console.log('Database connection succeeded!');
    app.listen(3000, () => console.log("Server started at localhost:3000"));
  })
  .catch(err => console.log(err));