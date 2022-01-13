'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
// error imports
const notFound = require('./error-handlers/404.js');
const serverError = require('./error-handlers/500.js');


app.use(express.json()); // this attaches any json to a body property on the request.

class Name {
  constructor(name) {
    this.name = name;
  }
}

app.use(logger);

app.get('/person', validator, createPerson);

function createPerson(req, res, next) {

  let { name } = req.query;

  let names = new Name(name);
  console.log('this is the new name = ', names);
  res.json(names);
}

// errors
app.use(notFound);
// if all else fails
app.use(serverError);

module.exports = {
  start: function (port) {
    app.listen(port, () => {
      console.log('App is running on : ' + port);
    });
  },
  app,
};