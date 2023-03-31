const express = require('express');
const APIRouter = express.Router();
const https = require('https');
const axios = require('axios');

APIRouter.post('/searchGames', async (req, res) => {
  const query = req.body.query;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&search=${encodeURIComponent(query)}`, (resp) => {
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
          rating: game.rating,
        }));

        res.status(200).json(gameData);
      });
    })
    .on('error', (err) => {
      console.log('Error' + err.message);
      res.status(500).json({ message: 'Error fetching data from the API.' });
    });
});

APIRouter.get('/genre', (req, res) => {
  // User's selected genres
  const selectedGenres = ['action','rpg','fps'];
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  // Make API queries for each selected genre
  const apiQueries = selectedGenres.map((genre) => {
    return axios.get(`https://api.rawg.io/api/games?key=${key}&genres=${genre}&page_size=5`);
  });

  // Send requests in parallel
  axios.all(apiQueries)
    .then((responses) => {
      const results = responses.map((response) => {
        // Extract only the desired properties for each game
        return response.data.results.map((game) => {
          return {
            name: game.name,
            backgroundImage: game.background_image,
            releaseDate: game.released,
            rating: game.rating
          };
        });
      });
      // Send results to the front end
      res.send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error fetching game data');
    });
});

APIRouter.get('/platform', async (req, res) => {
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&platform=xbox`, (resp) => {
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
          rating: game.rating,
        }));

        res.status(200).json(gameData);
      });
    })
    .on('error', (err) => {
      console.log('Error' + err.message);
      res.status(500).json({ message: 'Error fetching data from the API.' });
    });
});

APIRouter.get('/rating', (req, res) => {
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&page_size=40`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const games = JSON.parse(data).results;

        // filter games by rating, needs to be changed so game rating is chosen by user. 
        const filteredGames = games.filter((game) => game.rating >= 4);

        const gameData = filteredGames.map((game) => ({
          name: game.name,
          released: game.released,
          photo: game.background_image,
          genres: game.genres[0],
          genres2: game.genres[1],
          rating: game.rating,
        }));

        res.status(200).json(gameData);
      });
    })
    .on('error', (err) => {
      console.log('Error' + err.message);
      res.status(500).json({ message: 'Error fetching data from the API.' });
    });
});

APIRouter.get('/year', async (req, res) => {
  const year = req.params.year;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https.get(`https://api.rawg.io/api/games?key=${key}&page_size=40&dates=${year}-01-01,${year}-12-31`, (resp) => {
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
      }));

      res.status(200).json(gameData);
    });
  }).on('error', (err) => {
    console.log('Error' + err.message);
    res.status(500).json({ message: 'Error fetching data from the API.' });
  });
});


module.exports = APIRouter;