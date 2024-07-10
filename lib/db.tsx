import mysql from 'mysql'

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webask_db'
});

export default db;
