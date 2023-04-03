const express = require('express');
const APIRouter = express.Router();
const axios = require('axios');

const baseURL = 'https://api.rawg.io/api/games';
const key = 'd6823dbd4637434998d92a3eb889e30c';

const fetchData = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    const games = response.data.results;
    
    const gameData = games.map((game) => ({
      name: game.name,
      released: game.released,
      photo: game.background_image,
      genres: game.genres[0],
      genres2: game.genres[1],
      rating: game.rating,
    }));

    return gameData;
  } catch (err) {
    console.log('Error' + err.message);
    throw new Error('Error fetching data from the API.');
  }
};


// General game search
APIRouter.post('/searchGames', async (req, res) => {
  const query = req.body.query;

  try {
    const gameData = await fetchData(baseURL, {
      key,
      search: query,
      ordering: '-rating',
      page_size: 20,
    });

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Title lookup
APIRouter.post('/title', async (req, res) => {
  const query = req.body.query;

  try {
    const gameData = await fetchData(baseURL, {
      key,
      search: query,
      ordering: '-rating',
      page_size: 20,
      dates: `2015-01-01,${new Date().getFullYear()}-12-31`,
      rating: '9.0,10.0',
    });

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Genre lookup
APIRouter.post('/genre', async (req, res) => {
  const genre = req.body.genre;

  try {
    const gameData = await fetchData(baseURL, {
      key,
      genres: genre,
      ordering: '-rating',
      page_size: 20,
      dates: `2015-01-01,${new Date().getFullYear()}-12-31`,
      metacritic: '1,100',
      tag: -1, // Exclude DLCs
    });

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Company who made the game lookup
APIRouter.post('/developer', async (req, res) => {
  const developer = req.body.developer;

  try {
    const gameData = await fetchData(baseURL, {
      key,
      developers: developer,
      ordering: '-rating',
      page_size: 20,
      dates: `2015-01-01,${new Date().getFullYear()}-12-31`,
    });

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Platform lookup
APIRouter.post('/platform', async (req, res) => {
  const platform = req.body.platform;

  try {
    const gameData = await fetchData(baseURL, {
      key,
      platforms: platform,
      ordering: '-rating',
      page_size: 20,
      dates: `2015-01-01,${new Date().getFullYear()}-12-31`,
    });

    res.status(200).json(gameData);
    console.log(gameData)
  } catch (err) {
    console.error('Error in platform route:', err);
    res.status(500).json({ message: err.message });
  }
});


// Ratings lookup
APIRouter.post('/rating', async (req, res) => {
  const ratings = req.body.ratings;

  try {
    const gameData = await fetchData(baseURL, {
      key,
      ordering: '-rating',
      page_size: 20,
      dates: `2015-01-01,${new Date().getFullYear()}-12-31`,
    });

    const filteredGames = gameData.filter((game) => game.rating >= ratings);
    res.status(200).json(filteredGames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Year lookup
APIRouter.post('/year', async (req, res) => {
  const year = req.body.year;

  try {
    const gameData = await fetchData(baseURL, {
      key,
      ordering: '-released',
      page_size: 20,
      dates: `${year}-01-01,${year}-12-31`,
    });

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = APIRouter;