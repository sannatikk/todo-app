import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // Activate the .env file

const { Pool } = pkg;   // Import the Pool class from the pg package, which will be used to create a pool (reusable collection) of connections to the database.

const openDb = () => {
    const environment = process.env.NODE_ENV;           // Get the current environment (development, test, etc)
    console.log(`Current environment: ${environment}`); // Log current environment

    const dbName = environment === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME;  // Determine the database name based on the environment
    console.log(`Connecting to database: ${dbName}`);                                               // Log the database being connected to

    const pool = new Pool({ // Create a new pool instance
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: dbName,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    return pool;        // Return the pool instance
}

const pool = openDb();  // Create the database pool

export { pool };        // Export the pool