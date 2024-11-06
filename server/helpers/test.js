import fs from 'fs';            // File System Module
import path from 'path';        // Path Module
import { pool } from './db.js'; // Database Pool Connection
import { hash } from 'bcrypt';  // Hash Method
import pkg from 'jsonwebtoken'; // pkg is a variable that imports the jsonwebtoken package
const { sign } = pkg;           // sign is a variable that imports the sign method from the jsonwebtoken package, which will be used to create a token


const __dirname = import.meta.dirname // Get the directory name of the current module

const initializeTestDb = async() => {
    console.log('Initializing test database');
    const sql = fs.readFileSync(path.resolve(__dirname, '../test_db.sql')).toString();  // Read the test_db.sql file and convert it to a string
    await pool.query(sql);                                                              // Execute the SQL commands in the test_db.sql file
    console.log('Test database initialized');
}

const insertTestUser = async (email, password) => {                                                     // Insert a test user into the database with the specified email and password
    console.log('Inserting test user:', email);     
    const hashedPassword = await hash(password, 10);                                                    // Hash the password
    await pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', [email, hashedPassword]); // Insert the user into the database
    console.log('Test user inserted:', email);
};

const getToken = (email) => {
    return sign({user: email}, process.env.JWT_SECRET_KEY)  // Create a token for the specified email using the secret key
}

export { initializeTestDb, insertTestUser, getToken }