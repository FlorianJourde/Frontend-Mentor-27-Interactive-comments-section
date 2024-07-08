import mysql from 'mysql'

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webask_db'
});

export default db;

// const {
//   createPool
// } = require('mysql');

// const pool = createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'webask_db',
//   connectionLimit: 10
// })

// pool.query(`select * from comments`, (err, result, fields) => {
//   if (err) {
//     return console.log(err);
//   }
//   return console.log(result);
// })