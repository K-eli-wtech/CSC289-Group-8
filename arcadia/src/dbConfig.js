const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'your_host_name',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  connectionLimit: 10,
});

module.exports = pool;