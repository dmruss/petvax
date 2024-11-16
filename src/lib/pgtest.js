// import Pool from 'pg';
// const { Pool2 } = Pool
const pg = require('pg')

const pool = new pg.Pool({
    user: 'postgres',
    host: 'feverishly-undamaged-remora.data-1.use1.tembo.io',
    database: 'petvax',
    password: 'CalRbj919BTv7MVe',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

(async () => {
const client = await pool.connect();
  try {
    // const res = await client.query('SELECT NOW()');
    const res = await client.query('select * from app.users');
    console.log(res.rows[0]); // Current timestamp
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    client.release();
  }
})();
