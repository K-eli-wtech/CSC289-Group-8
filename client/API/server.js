const express = require('express');
const path = require('path');
const dbConnect = require("./dbConfig");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());

// Cors middleware to allow cross port connections
app.use(cors({
  origin: 'http://localhost:3001'
}));

app.post('/button-test', async (req, res) => {
    const { game1, game2, game3, game4, game5 } = req.body;
    console.log(game1, game2, game3, game4, game5);
    /*
    // Querying the database
    dbConnect.query(`UPDATE Users SET game1='${game1}', game2='${game2}', game3='${game3}', game4='${game4}', game5='${game5}' WHERE id=1`, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error querying database');
    } else {
      console.log(results);
      res.send('Received your request!');
    }
  });
  */

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



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


/* 
app.post('/button-click', async (req, res) => {
  try {
    const { game1, game2, game3, game4, game5 } = req.body;
    console.log(game1, game2, game3, game4, game5);
    res.send('Success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});
*/