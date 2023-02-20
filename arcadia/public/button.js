const express = require('express');
const dbC = require('./dbConfig');

const app = express();
const port = 3000;

app.get('/button-click', async (req, res) => {
    try {
      dbC.pool.getConnection(function(err){
        if (err) throw err;
        dbC.pool.query("Select * from Users", function(err, results, fields) {
          if (err) throw err;
          res.json(results);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });