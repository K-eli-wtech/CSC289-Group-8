const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'group8-projectdb.cb7cnaxezt2z.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'Group8_DB1',
  connectionLimit: 10,
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
