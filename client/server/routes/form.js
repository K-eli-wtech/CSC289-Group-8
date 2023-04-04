const express = require('express');
const formRouter = express.Router();
const dbConnect = require('../dbConfig');
const bcrypt = require('bcryptjs');

// Registering account php form
formRouter.post('/register', async (req, res) => {
  console.log(req.body);
  const { display_name, email, password } = req.body;
  console.log(display_name, email, password);

  try {
    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Insert the user data into the database
    const results = await dbConnect.execute(
      'INSERT INTO Users (display_name, email, password) VALUES (?, ?, ?)',
      [display_name, email, hash]
    );
    
    console.log(results);
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});


// Login php form
formRouter.get('/login', async (req, res) => {
  console.log(req.query);
  const { email, password } = req.query;

  try {
    // Get the user data from the database
    const [results] = await dbConnect.execute(
      `SELECT * FROM Users WHERE email = ?`,
      [email]
    );
    console.log(results)
    if (results.length === 0) {
      console.log("Login failed: invalid email or password");
      res.status(401).send('Invalid email or password');
    } else {
      // Compare the password with the hashed password from the database
      const isMatch = await bcrypt.compare(password, results[0].password);
      console.log(password, results[0].password);
      console.log(isMatch)
      if (isMatch) {
        console.log("Login successful");
        req.session.loggedIn = true;
        console.log(req.session);
        res.redirect('/profile.html'); // Redirect to the profile page
      } else {
        console.log("Login failed: invalid email or password");
        res.status(401).send('Invalid email or password');
      }
    }
  } catch (error) {
    console.error(error); // Log the error message
    res.status(500).send('Error querying database');
  }
});


// Handles logged in session data
formRouter.get('/check-login', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});


// Handles logging out
formRouter.get('/logout', (req, res) => {
  console.log("Before logout:", req.session);
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging out');
    } else {
      console.log("After logout:", req.session);
      res.status(200).send('Logged out');
    }
  });
});


// Check user endpoint
formRouter.post('/check-user', async (req, res) => {
  let email = req.body.email;
  let display_name = req.body.display_name;

  try {
    // Check if the email or username already exists in the database
    const [rows] = await dbConnect.execute(
      'SELECT * FROM Users WHERE email = ? OR display_name = ?',
      [email, display_name]
    );
    if (rows.length > 0) {
      // Return an error message if the email or username already exists
      res.status(400).send({ status: 'exists' });
    } else if (email === '' || display_name === '') {
      // Return an error message if the email or username are empty
      res.status(400).send({ status: 'empty' });
    } else {
      // Return a success message if the email and username are both unique
      res.status(200).send({ status: 'unique' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = formRouter;