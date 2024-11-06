import { pool } from '../helpers/db.js' // Import the pool instance from the db.js file to connect to the database
import { Router } from 'express';       // Import the Router class from the express package to create routes for the API
import { hash, compare } from 'bcrypt'; // Import the hash and compare methods from the bcrypt package to hash and compare passwords
import jwt from 'jsonwebtoken';         // Import the jsonwebtoken package to create and verify tokens
import { postLogin, postRegistration } from '../controllers/UserController.js';

const { sign } = jwt                    // sign is a variable that imports the sign method from the jsonwebtoken package, which will be used to create a token
const router = Router()                 // Create a new router instance

router.post('/register', postRegistration)
router.post('/login', postLogin)

export default router
