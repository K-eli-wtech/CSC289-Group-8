const express = require('express');
// const mysql = require('mysql2');     If we need to use mysql for this

const app = express();

// Define a route for button click
app.get('/button-click', (req, res) => {
  // Code to query the database using mysql2
  // ...
  res.send('Button was clicked!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

export default app;
