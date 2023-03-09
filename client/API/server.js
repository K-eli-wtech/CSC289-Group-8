// Main modules
const express = require('express');
const phpExpress = require('php-express')({ binPath: 'php' });
const path = require('path');
const app = express();
const port = 3000;

// Routes to external files
const pagesRouter = require('./routes/form');
const gamesRouter = require('./routes/recommend');
const emailRouter = require('./routes/email');

// Middlewares
const corsMiddleware = require('./middlewares/cors');
const sessionMiddleware = require('./middlewares/session');
const loggedInMiddleware = require('./middlewares/loggedIn');

// Use middleware functions
app.use(corsMiddleware);
app.use(sessionMiddleware);
app.use(loggedInMiddleware);

// The phpExpress middleware
app.engine('php', phpExpress.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'php');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

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