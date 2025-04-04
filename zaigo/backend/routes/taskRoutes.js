import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/tasksController.js";
import { validateToken } from "../utils/middleware.js";

const tasksRouter = Router()

tasksRouter.route('/list').get(validateToken, getAllTasks)

tasksRouter.route('/:id').get(validateToken, getTask)

tasksRouter.route('/').post(validateToken, createTask)

tasksRouter.route('/update/:id').put(validateToken, updateTask)

tasksRouter.route('/delete').delete(validateToken, deleteTask)

export default tasksRouter