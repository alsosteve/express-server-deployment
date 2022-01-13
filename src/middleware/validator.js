'use strict';

function validator(req, res, next) {

  let name = req.query.name; 

  if(!name) {
    next('bad request');
  } else {
    next();
  }
}


module.exports = validator;