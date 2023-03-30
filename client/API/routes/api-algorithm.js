// Tyler's test node.js file for any api algorithm based search. Please keep. 

/* const https = require('https');

const apiKey = 'd6823dbd4637434998d92a3eb889e30c';
const year = '2020';
const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&dates=${year}-01-01,${year}-12-31`;

https.get(url, (resp) => {
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

    console.log(gameData);
  });
}).on('error', (err) => {
  console.log('Error' + err.message);
}); */