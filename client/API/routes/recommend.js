const express = require('express');
const gamesRouter = express.Router();
const dbConnect = require('../dbConfig');
const bodyParser = require('body-parser');

gamesRouter.use(bodyParser.urlencoded({ extended: true }));
gamesRouter.use(bodyParser.json());

// 5 random games button
gamesRouter.post('/button-test', async (req, res) => {
  const { game1, game2, game3, game4, game5 } = req.body;
  console.log(game1, game2, game3, game4, game5);

  // Checking the data
  dbConnect.query(`SELECT * FROM Users`, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error querying database');
    } else {
      console.log(results);
      res.send('Received your request!');
    }
  });
});

module.exports = gamesRouter;
