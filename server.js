const express = require('express');
const server = express();

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`
    I bet you thought I wouldn't work.
  `);
});

//custom middleware
function logger(req, res, next) {
  console.log(`Method: ${req.method}, url: ${req.url}, timestamp: [${new Date().toISOString()}]`);
  next();
};


module.exports = server;