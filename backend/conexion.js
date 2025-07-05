import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Tu URL de Render PostgreSQL
  ssl: {
    rejectUnauthorized: false
  }
});

export const getConnection = async () => {
  return await pool.connect();
};