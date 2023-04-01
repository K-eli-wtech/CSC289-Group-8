const express = require('express');
const APIRouter = express.Router();
const https = require('https');
const axios = require('axios');

APIRouter.post('/searchGames', async (req, res) => {
  const query = req.body.query;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&search=${encodeURIComponent(query)}&ordering=-rating&page_size=20&dates=2015-01-01,${new Date().getFullYear()}-12-31`, (resp) => {
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

APIRouter.post('/title', async (req, res) => {
  const query = req.body.query;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&search=${query}&ordering=-rating&page_size=20&dates=2015-01-01,${new Date().getFullYear()}-12-31&rating=9.0,10.0`, (resp) => {
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

APIRouter.post('/genre', async (req, res) => {
  const genre = req.body.genre;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&genres=${genre}&ordering=-rating&page_size=20&dates=2015-01-01,${new Date().getFullYear()}-12-31&metacritic=1,100`, (resp) => {
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

APIRouter.post('/developer', async (req, res) => {
  const developer = req.body.developer;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&developers=${developer}&ordering=-rating&page_size=20&dates=2015-01-01,${new Date().getFullYear()}-12-31`, (resp) => {
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


APIRouter.post('/platform', async (req, res) => {
  const platform = req.body.platform;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&platforms=${platform}&ordering=-rating&page_size=20&dates=2015-01-01,${new Date().getFullYear()}-12-31`, (resp) => {
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

APIRouter.post('/rating', (req, res) => {
  const ratings = req.body.ratings;
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&ordering=-rating&page_size=20&dates=2015-01-01,${new Date().getFullYear()}-12-31`, (resp) => {
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

APIRouter.post('/year', async (req, res) => {
  const year = req.body.year
  const key = 'd6823dbd4637434998d92a3eb889e30c';

  https
    .get(`https://api.rawg.io/api/games?key=${key}&ordering=-released&page_size=20&dates=${year}-01-01,${year}-12-31`, (resp) => {
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
    }).on('error', (err) => {
      console.log('Error' + err.message);
      res.status(500).json({ message: 'Error fetching data from the API.' });
    });
});


module.exports = APIRouter;