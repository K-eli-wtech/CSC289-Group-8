const express = require('express');
const path = require('path');
const dbConnect = require("./dbConfig");
const bodyParser = require('body-parser');
const cors = require('cors');
const phpExpress = require('php-express')({
  binPath: 'php'
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());

// Cors middleware to allow cross port connections
app.use(cors({
  origin: 'http://localhost:3001'
}));

// Add the phpExpress middleware
app.engine('php', phpExpress.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'php');

app.post('/register.php', phpExpress.router);
app.post('/login.php', phpExpress.router);

// Registering account php form
app.post('/register', async (req, res) => {
    console.log(req.body);
    const { display_name, email, password } = req.body;
    console.log(display_name, email, password);

    // Checking the data
    dbConnect.query(`INSERT INTO Users (display_name, email, password) VALUES ("${display_name}", "${email}", "${password}")`, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error querying database');
      } else {
        console.log(results);
        res.send('User registered successfully!');
      }
    });
});

// Login php form
app.get('/login', async (req, res) => {
  console.log(req.query);
  const { email, password } = req.query;
  console.log(email, password);

  // Checking the data
  dbConnect.query(`SELECT * FROM Users WHERE email="${email}" AND password="${password}"`, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error querying database');
    } else if (results.length === 0) {
      res.status(401).send('Invalid email or password');
    } else {
      console.log(results);
      res.send('User logged in successfully!');
    }
  });
});



// 5 random games button
app.post('/button-test', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
