'use strict';

function notFound(req, res, next) {
  console.log('Error! no route found for the last request');
  res.status(404).send('Not Found');
}

module.exports = notFound;