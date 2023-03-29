const express = require('express');
const APIRouter = express.Router();
// const http = require("http");
const https = require("https"); 

APIRouter.post('/rawgAPI', async (req, res) => {
    https
    .get("https://api.rawg.io/api/games?key=d6823dbd4637434998d92a3eb889e30c&search=", resp => {
        let data = "";

        resp.on("data", chunk => {
            data += chunk;
        });

        resp.on("end", () => {
            const games = JSON.parse(data).results;
        /*    let url = JSON.parse(data);
            console.log(url); */


            // Extracts only the name of the game, release date and two genres for each game
            const gameData = games.map(game => ({
                name: game.name,
                released: game.released,
                photo: game.background_image,
                genres: game.genres[0], 
                genres2: game.genres[1],
            }));
            console.log(gameData); 
        }); 
    }) 
    .on("error", err => {
        console.log("Error" + err.message);
    });

});

module.exports = APIRouter;