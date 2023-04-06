const express = require('express');
const accountRouter = express.Router();
const dbConnect = require('../dbConfig');



// Handles logged in session data
accountRouter.get('/check-login', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});


// Handles logging out
accountRouter.get('/logout', (req, res) => {
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


// Endpoint for getting user data
accountRouter.get('/get-user-data', async (req, res) => {
  const email = req.session.email;
  if (!email) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    const [rows] = await dbConnect.execute('SELECT * FROM Users WHERE email = ?', [email]);
    if (rows.length === 0) {
      res.status(404).send('User not found');
    } else {
      const userData = rows[0];
      res.status(200).json(userData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Endpoint for updating the user data
accountRouter.post('/update-user-data', async (req, res) => {
  const { first_name, last_name, age, display_name, phone_number } = req.body;
  const email = req.session.email;

  if (!email) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    await dbConnect.execute(
      'UPDATE Users SET First_name=?, last_name=?, age=?, display_name=?, phone_number=? WHERE email=?',
      [first_name, last_name, age, display_name, phone_number, email]
    );
    res.status(200).send('User data updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Endpoint for adding a favorite game to a user's profile
accountRouter.post('/add-favorite-game', async (req, res) => {
  const { gameName } = req.body;
  const email = req.session.email;

  if (!email) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    // Check if the game is already in the user's favorites
    const [existingGame] = await dbConnect.execute(
      'SELECT * FROM UserFavorites WHERE email = ? AND game_name = ?',
      [email, gameName]
    );

    if (existingGame.length > 0) {
      res.status(409).send('Game already in user favorites');
      return;
    }

    // Add the game to the user's favorites
    await dbConnect.execute(
      'INSERT INTO UserFavorites (email, game_name) VALUES (?, ?)',
      [email, gameName]
    );

    res.status(200).send('Game added to user favorites');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = accountRouter;
