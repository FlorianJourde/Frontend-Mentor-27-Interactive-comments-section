// import mysql from 'mysql'
import mysql from 'mysql2/promise'

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webask_db'
  });

// export const dbInfos = {
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'webask_db'
// }

export default db;

