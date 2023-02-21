const express = require('express');
const cors = require("cors")
const app = express();

const port = 3000; // Port we will listen to so that we can recieve client side fetches

app.use(express.static('public'));
app.use(express.json());
app.use(cors())

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

app.post('http://localhost:3000/button-click', (req, res) => {
  const game1 = req.body.game1;
  const game2 = req.body.game2;
  const game3 = req.body.game3;
  const game4 = req.body.game4;
  const game5 = req.body.game5;

  console.log(`Received games: ${game1}, ${game2}, ${game3}, ${game4}, ${game5}`);

  res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});



