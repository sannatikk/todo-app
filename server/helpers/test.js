import fs from 'fs';
import path from 'path';
import { pool } from './db.js';
import { hash } from 'bcrypt';

const __dirname = import.meta.dirname

const initializeTestDb = async() => {
    console.log('Initializing test database');
    const sql = fs.readFileSync(path.resolve(__dirname, '../test_db.sql')).toString();
    await pool.query(sql);
    console.log('Test database initialized');
}

const insertTestUser = async (email, password) => {
    console.log('Inserting test user:', email);
    const hashedPassword = await hash(password, 10);
    await pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    console.log('Test user inserted:', email);
};

export { initializeTestDb, insertTestUser }