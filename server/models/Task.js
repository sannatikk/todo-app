import { pool } from '../helpers/db.js' // Import the pool instance from the db.js file to connect to the database

const selectAllTasks = async () => {    // Create a function to select all tasks from the task table
    return await pool.query('SELECT * FROM task')   
}

const insertTask = async (description) => { // Create a function to insert a task into the task table
    return await pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [description])    // Insert the description into the task table and return the result
}

const removeTask = async(id) => {
    const idInt = parseInt(id) // Get the id from the request parameters and convert it to an integer using parseInt
    return await pool.query('DELETE FROM task WHERE id = $1', [idInt])     // Delete the task with the specified id from the task table
}

export { selectAllTasks, insertTask, removeTask }