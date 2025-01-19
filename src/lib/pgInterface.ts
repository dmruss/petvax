// import { Pool, Client } from 'pg';
const pg = require('pg')

// Create a connection pool
let pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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
    // console.log(checkResult);
    if (checkResult.rows.length > 0) {
      // console.log('User already exists:', checkResult.rows[0]);
    } else {
      // Insert the user
      const insertQuery = 'INSERT INTO app.users (first_name, email) VALUES ($1, $2)';
      await client.query(insertQuery, [firstName, email]);
      // console.log('User inserted:', { firstName, email });
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

export const insertVaccine = async (user_email: string, name: string, dateAdministered: string, nextDueDate: string, notificationEmail: string, notificationPhone: string): Promise<void> => {
  let client, user_id;
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
    //get user_id from email
    const idQuery = 'SELECT id FROM app.users WHERE email = $1';
    const idResult = await client.query(idQuery, [user_email]);
    console.log(idResult);
    if (idResult.rows.length > 0) {
      user_id = idResult.rows[0].id;
      console.log(user_id);
    } else {
      throw Error('User does not exist');
    }

      // Insert the vaccine
    const insertQuery = 'INSERT INTO app.vaccineform (user_id, name, date_admin, date_next) VALUES ($1, $2, $3, $4)';
    await client.query(insertQuery, [user_id, name, dateAdministered, nextDueDate]);
    console.log('Vaccine inserted:', { user_id, name, dateAdministered, nextDueDate });
    
    const selectQuery = "select id from app.vaccineform where user_id = $1 and name = $2 and date_admin = $3 and date_next = $4";
    let response = await client.query(selectQuery, [user_id, name, dateAdministered, nextDueDate ]);
    return response.rows;

    //todo insert notification info

    // Commit the transaction
    // await client.query('COMMIT');
  } catch (error) {
    // Rollback the transaction in case of an error
    // await client.query('ROLLBACK');
    console.error('Error inserting vaccine:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getVaccines = async (user_email: string): Promise<string[]> => {
  let client;
  try {
    client = await pool.connect();
    let user_id = await getUserIdWithEmail(user_email);
    const selectQuery = "select * from app.vaccineform where user_id = $1";
    let response = await client.query(selectQuery, [user_id]);
    console.log(`getVaccines response: ${response}`);
    return response.rows;
  } catch (error) {
    console.error('Error retrieving vaccines:', error)
    throw error;
  } finally {
    client.release();
  }
}

const getUserIdWithEmail = async (user_email: string): Promise<string|undefined> => {
  let user_id, e, client;
  try {
    client = await pool.connect();
    const idQuery = 'SELECT id FROM app.users WHERE email = $1';
    const idResult = await client.query(idQuery, [user_email]);
    console.log(idResult);
    if (idResult.rows.length > 0) {
      user_id = idResult.rows[0].id;
      console.log(user_id);
    } else {
      throw Error('User does not exist');
    } 
  }
  catch (error) {
    throw error;
  } finally {
    client.release();
  }
  return user_id
}

// Close the pool on application exit
export const closePool = async (): Promise<void> => {
  await pool.end();
};

export const deleteVaccine = async (user_email: string, vaccineId: string): Promise<void> => {
  let client, user_id;
  try {
    client = await pool.connect();
    console.log('connected to database');
  } catch (error) {
    console.log('Error connecting to the database:', error);
    throw error;
  }

  try {
    // Retrieve the user ID associated with the email
    const idQuery = 'SELECT id FROM app.users WHERE email = $1';
    const idResult = await client.query(idQuery, [user_email]);
    if (idResult.rows.length > 0) {
      user_id = idResult.rows[0].id;
    } else {
      throw new Error('User does not exist');
    }

    // Delete the vaccine associated with the user and vaccine id
    const deleteQuery = 'DELETE FROM app.vaccineform WHERE user_id = $1 AND id = $2';
    const deleteResult = await client.query(deleteQuery, [user_id, vaccineId]);

    if (deleteResult.rowCount > 0) {
      console.log(`Vaccine "${vaccineId}" deleted for user ID: ${user_id}`);
    } else {
      console.log(`No vaccine record found for id "${vaccineId}" and user ID: ${user_id}`);
    }
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    throw error;
  } finally {
    client.release();
  }
};
