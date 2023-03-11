const session = require('express-session');

const sessionMiddleware = session({
  secret: 'safg921ka@#!asdakga21312',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Change this to true if you're using HTTPS
});

module.exports = sessionMiddleware;
