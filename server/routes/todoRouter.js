
import { pool } from '../helpers/db.js' // Import the pool instance from the db.js file
import { Router } from 'express'        // Import the Router class from the express package to create routes for the API
import { auth } from '../helpers/auth.js'        // Import the auth function from the auth.js file to authenticate users
import { getTasks, postTask, deleteTask } from '../controllers/TaskController.js'

const router = Router() // Create a new router instance

router.get('/', getTasks)
router.post('/create', auth, postTask) 
router.delete('/delete/:id', auth, deleteTask)  

export default router   