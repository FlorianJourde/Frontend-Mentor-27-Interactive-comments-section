import mysql from 'mysql2/promise'

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'srv904.hstgr.io',
  user: 'u718790758_webask_user',
  password: 'JUa91Q@y#9',
  database: 'u718790758_webask_db'
});

export default db;
