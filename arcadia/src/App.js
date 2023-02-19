const express = require('express');
const dbC = require('./dbConfig');

const app = express();

// Define a route for handling button clicks
app.get('/button-click', async (req, res) => {
  try {
    // Get the game names from the query parameters
    const { game1, game2, game3, game4, game5 } = req.query;
    
    // Check if the data exists in the database
    const [result] = await dbC.pool.execute("select * from Users where name IN (?, ?, ?, ?, ?)", [game1, game2, game3, game4, game5]);
    const dataExists = result.length > 0;
    console.log(`Data exists: ${dataExists}`);
    
    // Query the database for recommended games based on the input
    const [rows] = await dbC.pool.execute("select * from Users where name IN (?, ?, ?, ?, ?)", [game1, game2, game3, game4, game5]);
    const recommendedGames = rows.map(row => row.name);
    
    // Send the recommended games as the response
    res.send(`Recommended games: ${recommendedGames.join(', ')}`);
  } catch (error) {
    console.error(error);
    console.log();
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

export default app;