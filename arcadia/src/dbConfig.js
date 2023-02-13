const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'your_host_name',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  connectionLimit: 10,
});

pool.getConnection(function(err){
  if (err) throw err;
  pool.query("Select * from Users", function(err, results, fields){
    if (err) throw err;
    console.log(results);
  });
});

// Testing connection to AWS RDS. Last Tested 2/13 from Tylers Computer


// pool.getConnection(function(err){
//  if (err) throw err;
//  pool.query("Select * from Users", function(err, results, fields) {
//    if (err) throw err;
//    console.log (results);
//  });
//});

module.exports = pool;