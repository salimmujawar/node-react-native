const oracledb = require('oracledb');

oracledb.autoCommit = true;

const oraCon =  oracledb.getConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString:`${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SCHEMA}`
})
.then(() => {
  console.log('Oracle db is connected')
})
.catch(err => console.log(err.message));

module.exports = oraCon;