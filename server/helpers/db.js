import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const { Pool } = pkg;

const openDb = () => {
    const environment = process.env.NODE_ENV; // Get the current environment
    console.log(`Current environment: ${environment}`); // Log current environment

    const dbName = environment === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME; // Determine the database name based on the environment
    console.log(`Connecting to database: ${dbName}`); // Log the database being connected to

    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: dbName, // Use the determined database name
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    return pool; // Return the pool instance
}

const pool = openDb(); // Create the database pool

export { pool }; // Export the pool