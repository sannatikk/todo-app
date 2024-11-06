import { Router } from 'express'  // Import the Router class from the express package to create routes for the API
import { auth } from '../helpers/auth.js'
import { getTasks, postTask, deleteTask } from '../controllers/TaskController.js'

const router = Router()

router.get('/', getTasks)
router.post('/create', auth, postTask) 
router.delete('/delete/:id', auth, deleteTask)  

export default router   