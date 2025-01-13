const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error('Error al conectar a la base de datos:', err);
  } else {
      console.log('Conexión exitosa:', res.rows);
  }
  pool.end();
});

module.exports= { pool }