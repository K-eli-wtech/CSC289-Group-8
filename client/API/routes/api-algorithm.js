const axios = require('axios');
const express = require('express');
const apialgo = express.Router;

apialgo.get('/games', (req, res) => {
    // User's selected genres
    const selectedGenres = ['action','rpg','fps'];
    const key = 'd6823dbd4637434998d92a3eb889e30c';
  
    // Make API queries for each selected genre
    const apiQueries = selectedGenres.map((genre) => {
      return axios.get(`https://api.rawg.io/api/games?key=${key}&genres=${genre}&ordering=-rating&page_size=5`);
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
  
module.exports = apialgo;