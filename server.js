//things the server need to work
const express = require('express');
const server = express();
server.use(express.json());
//use my middleware
server.use(logger);
//use my routes
const ProjectRouter = require('./routes/projectRoutes');
server.use('/projects', ProjectRouter);

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