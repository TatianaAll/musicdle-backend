const { Pool } = require('pg');

const requiredEnvVars = ['PGHOST', 'PGPORT', 'PGDATABASE', 'PGUSER', 'PGPASSWORD'];

const validateDatabaseConfig = () => {
  const missingEnvVars = requiredEnvVars.filter((variable) => !process.env[variable]);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing PostgreSQL environment variables: ${missingEnvVars.join(', ')}`);
  }
};

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

const initDatabase = async () => {
  validateDatabaseConfig();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
};

module.exports = {
  validateDatabaseConfig,
  pool,
  initDatabase,
};