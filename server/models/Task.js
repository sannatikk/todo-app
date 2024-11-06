import { pool } from '../helpers/db.js'

const selectAllTasks = async () => {
    return await pool.query('SELECT * FROM task')   
}

const insertTask = async (description) => {
    return await pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [description])
}

const removeTask = async(id) => {
    const idInt = parseInt(id)  // Convert the id to an integer
    return await pool.query('DELETE FROM task WHERE id = $1', [idInt])
}

export { selectAllTasks, insertTask, removeTask }