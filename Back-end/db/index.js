const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = require('../config');
const { Pool } = require('pg');

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: 5432,
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  end: () => {
    return pool.end();
  },
  testConnection: async () => {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('db is conencted');
    } catch (error) {
      console.log('error connecting to db');
    }
  },
};
