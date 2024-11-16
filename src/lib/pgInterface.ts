// import { Pool, Client } from 'pg';
const pg = require('pg')

// Create a connection pool
let pool = new pg.Pool({
  user: 'postgres',
  host: 'feverishly-undamaged-remora.data-1.use1.tembo.io',
  database: 'petvax',
  password: 'CalRbj919BTv7MVe',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
}
});
// Function to check if a user exists and insert if they do not
export const upsertUser = async (firstName: string, email: string): Promise<void> => {
  let client;
  try {
  client = await pool.connect();
  console.log('connected to database');
  } catch (error) {
    console.log(error)
  }
  try {
    // Start a transaction
    // await client.query('BEGIN');
    console.log('beginning query');
    // Check if the user exists
    const checkQuery = 'SELECT * FROM app.users WHERE email = $1';
    const checkResult = await client.query(checkQuery, [email]);
    console.log(checkResult);
    if (checkResult.rows.length > 0) {
      console.log('User already exists:', checkResult.rows[0]);
    } else {
      // Insert the user
      const insertQuery = 'INSERT INTO app.users (first_name, email) VALUES ($1, $2)';
      await client.query(insertQuery, [firstName, email]);
      console.log('User inserted:', { firstName, email });
    }

    // Commit the transaction
    // await client.query('COMMIT');
  } catch (error) {
    // Rollback the transaction in case of an error
    // await client.query('ROLLBACK');
    console.error('Error upserting user:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Close the pool on application exit
export const closePool = async (): Promise<void> => {
  await pool.end();
};
