// Main modules
const express = require('express');
const session = require('express-session');
const phpExpress = require('php-express')({ binPath: 'php' });

// Routes to external files
const pagesRouter = require('./routes/form');
const gamesRouter = require('./routes/recommend');
const emailRouter = require('./routes/email');

// Middleware
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Cors middleware to allow cross port connections
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
  })
);

// Add the phpExpress middleware
app.engine('php', phpExpress.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'php');

// Express session setup
app.use(session({
  secret: 'safg921ka@#!asdakga21312',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Change this to true if you're using HTTPS
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

// Initialize loggedIn flag in session
app.use(function(req, _, next) {
  if (!req.session.loggedIn) {
    req.session.loggedIn = false;
  }
  next();
});

// route to form and recommend
app.use('/pages', [pagesRouter, gamesRouter, emailRouter]);

// path define and redirect to the profile page
app.get('/profile.html', (req, res) => {
  // Check if user is logged in
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, '../public/profile.html'));
  } else {
    res.redirect('/login.html');
  }  
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});