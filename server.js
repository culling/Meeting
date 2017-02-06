process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('./config/express');

var app         = express();

app.listen(3001);
module.exports = app;
console.log('server running at http://localhost:3001');