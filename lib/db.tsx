import mysql from 'mysql2/promise'

console.log('Environment check:', {
  DB_HOST: process.env.DB_HOST || 'MISSING',
  DB_USER: process.env.DB_USER || 'MISSING',
  DB_NAME: process.env.DB_NAME || 'MISSING',
  DB_PASSWORD: process.env.DB_PASSWORD || 'MISSING'
})

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default db;
