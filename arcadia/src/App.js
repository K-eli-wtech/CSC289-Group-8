const express = require('express');
const dbC = require('./dbConfig');

const app = express();

// Define a route for handling button clicks
app.get('/button-click', async (req, res) => {
  try {
    // Get the game names from the query parameters
    const { game1, game2, game3, game4, game5 } = req.query;
    
    // Query the database for recommended games based on the input
    const [rows] = await dbC.pool.execute("select * from Users where game1 ='Tarkov' and game2 ='Hogwarts Legacy' and game3 = 'Fallout 4' and game4 = 'Rust'and game5 = 'CSGO';", [game1, game2, game3, game4, game5]);
    const recommendedGames = rows.map(row => row.name);
    
    // Send the recommended games as the response
    res.send(`Recommended games: ${recommendedGames.join(', ')}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

export default app;
