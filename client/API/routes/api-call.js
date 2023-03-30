const express = require('express');
const APIRouter = express.Router();
const https = require('https');

APIRouter.post('/searchGames', async (req, res) => {
  const { platform, rating, genre, year, title, company } = req.body;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  // Construct the query string based on the search parameters
  let queryString = `https://api.rawg.io/api/games?key=${key}&page_size=15`;

  if (platform) queryString += `&platforms=${platform}`;
  if (rating) queryString += `&rating=${rating}`;
  if (genre) queryString += `&genres=${genre}`;
  if (year) queryString += `&dates=${year}-01-01,${year}-12-31`;
  if (title) queryString += `&search=${encodeURIComponent(title)}`;
  if (company) queryString += `&developers=${encodeURIComponent(company)}`;

  // Make the API request with the constructed query string
  https
    .get(queryString, (resp) => {
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
