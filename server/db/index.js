const knex = require('knex');
const dotenv = require('dotenv').config({path: '../.env'});
const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    user:  process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
  },
  pool: { min: 0, max: 7 }
};

const db = knex(knexConfig);

module.exports = db;
