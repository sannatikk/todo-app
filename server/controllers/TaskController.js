import { selectAllTasks, insertTask, removeTask } from "../models/Task.js"
import { emptyOrRows } from "../helpers/utils.js"
import { ApiError } from "../helpers/ApiError.js"

const getTasks = async (req, res) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(emptyOrRows(result))
    } catch (error) {
        return next(error) 
    }
}

const postTask = async (req, res, next) => {

    try {
        if (!req.body.description || req.body.description.length === 0) {
            return next(new ApiError('Description is required', 400))
        }
        const result = await insertTask(req.body.description)
        return res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        return next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        if (!req.params.id || req.params.id.length === 0) {
            return next(new ApiError('ID is required', 400))
        }
        await removeTask(req.params.id);
        return res.status(200).json({ message: 'Task deleted: ', id: req.params.id });

    } catch (error) {
        return next(error);
    }
};

export { getTasks, postTask, deleteTask }