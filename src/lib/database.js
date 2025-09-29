import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Untuk Aiven MySQL, set ke false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

let pool;

export async function getConnection() {
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig);
      // Test connection
      const connection = await pool.getConnection();
      console.log('Database connected successfully');
      connection.release();
    } catch (error) {
      console.error('Failed to create database pool:', error);
      throw error;
    }
  }
  return pool;
}

export async function executeQuery(query, params = []) {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    console.error('Query:', query);
    console.error('Params:', params);
    throw error;
  }
}

// Test database connection function
export async function testConnection() {
  try {
    await executeQuery('SELECT 1 as test');
    console.log('Database connection test successful');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

export default { getConnection, executeQuery };