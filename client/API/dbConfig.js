const mysql = require('mysql2');

const dbInfo = mysql.createPool({
  host: 'group8-projectdb.cb7cnaxezt2z.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'Group8_DB1',
  connectionLimit: 10,
});


module.exports = dbInfo;
