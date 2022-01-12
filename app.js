'use strict';

const express = require('express');

// express() -> singleton pattern, single object to be modified to do something, 
// returns object that can be modified
const app = express();

const messages = [];
class Message {
  constructor(text, author) {
    this.text = text;
    this.author = author;
  }
}

// // 2 things
// // Route - string
// // Call back function -  tells the route what to do , with 2 params: request & response
// app.get('/message', (request, response) => {
//   console.log('Someone sent a request!: + request.method');
//   // create a message and send it back?
//   response.send(messages);
// }); // this method / function modifies our app singleton.

// app.post('/message', (request, response, next) => {
//   const messageText = request.query.text;
//   const authorName = request.query.author;

//   next('an error has occured');


//   const message = new Message(messageText, authorName); // creates the message
//   messages.push(message);
//   response.send(message);
// });

//create message function
function createMessage(request, response, next){

  const messageText = request.query.text;
  const authorName = request.query.author;

  if (!messageText || !authorName) {
    next('both missing.');
  } else {
    const message = new Message(messageText, authorName);
    
    request.message = message;
    next();
  }
}

// save message function
function saveMessage(request, response, next) {
  console.log('added dater', request.message);
  
  let message = request.message;
  messages.push(message);
  next();
}

app.post('/message', createMessage, saveMessage, (request, response, next) => {

  response.send(messages);
});


// error handler function
app.use(function (err, request, response, next) {
  console.log(err);
  response.send('normal error handler, lol');
});


// must be at the bottom because it is not an actual function
app.use(function (request, response) {
  response.status(404).send('*** These are not the droids you are looking for. ***');
});

// module.exports = app;

module.exports = {
  start: function (port) {
    app.listen(port, () => {
      console.log('App is running on : ' + port);
    });
  },
  app,
};

//coded with jacob and used joey's code to find bugs