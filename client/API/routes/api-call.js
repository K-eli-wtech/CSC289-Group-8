const express = require('express');
const APIRouter = express.Router();
const https = require('https');

APIRouter.post('/rawgAPI', async (req, res) => {
  const query = req.body.query;

  https
    .get(`https://api.rawg.io/api/games?key=d6823dbd4637434998d92a3eb889e30c&search=${encodeURIComponent(query)}`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const games = JSON.parse(data).results;

        const gameData = games.map((game) => ({
          name: game.name,
          released: game.released,
          photo: game.background_image,
          genres: game.genres[0],
          genres2: game.genres[1],
        }));

        res.status(200).json(gameData);
      });
    })
    .on('error', (err) => {
      console.log('Error' + err.message);
      res.status(500).json({ message: 'Error fetching data from the API.' });
    });
});

module.exports = APIRouter;
