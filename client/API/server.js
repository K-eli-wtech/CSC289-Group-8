const express = require('express');
const path = require('path');
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

app.post('/button-test', (req, res) => {
  const game1 = req.body.game1;
  const game2 = req.body.game2;
  const game3 = req.body.game3;
  const game4 = req.body.game4;
  const game5 = req.body.game5;

  console.log(game1, game2, game3, game4, game5);

  res.send('Received your request!');
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