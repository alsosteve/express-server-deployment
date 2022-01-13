'use strict';

require('dotenv').config();
const server = require('./src/server.js');



// server.listen(3000, () => {
//   console.log('Server is running');
// });

const PORT = process.env.PORT || 3000;

server.start(PORT);