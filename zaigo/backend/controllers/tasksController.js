import TasksModel from "../models/tasksModel.js";
import { sendResponse } from "../utils/common.js";
import { createdSuccessfully, deletedSuccessfully, fetchedSuccessfully, internalError, updatedSuccessfully } from "../utils/responseMessageHelper.js";
import Joi from "joi";

const tasks = new TasksModel()

const tasksController = {
  getAllTasks: async (req, resp) => {
    const page = req.query.page;
    const status = req.query.status
    try {
      const result = await tasks.getAllTasks(page, status)
      sendResponse(resp, 200, fetchedSuccessfully('Tasks List'), result)
    }
    catch (error) {
      sendResponse(resp, 500, internalError(), error.message)
    }
  },

  getTask: async (req, resp) => {
    try {
      const id = req.params.id
      const result = await tasks.getTaskById(id)
      sendResponse(resp, 200, fetchedSuccessfully('Tasks'), result)
    }
    catch (error) {
      sendResponse(resp, 500, internalError(), error.message)
    }
  },


  createTask: async (req, resp) => {
    try {
      const data = { ...req.body, createdBy: req.user_id }

      const taskSchema = Joi.object({
        "title": Joi.string().required(),
        "description": Joi.string().allow(""),
        "status": Joi.string().allow(""),
        "assignedTo": Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid assignedTo ObjectId'),
        "createdBy": Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid user id ObjectId')
      })
      const validation = taskSchema.validate(data)
      if (validation.error) {
        sendResponse(resp, 500, internalError(), validation.error.details[0])
      }
      else {
        const result = await tasks.createTask(data)
        sendResponse(resp, 200, createdSuccessfully('Tasks'), result)
      }
    }
    catch (error) {
      sendResponse(resp, 500, internalError(), error.message)
    }
  },


  updateTask: async (req, resp) => {
    try {
      const id = req.params.id
      const data = req.body
      const user_id = req["user_id"]
      console.log(user_id)
      const result = await tasks.updateTask(id, user_id, data)
      sendResponse(resp, 200, updatedSuccessfully('Tasks'), result)
    }
    catch (error) {
      sendResponse(resp, 500, internalError(), error.message)
    }
  },


  deleteTask: async (req, resp) => {
    try {
      const id = req.params.id
      const result = await tasks.deleteTask(id)
      if (result.length > 0) {
        sendResponse(resp, 200, deletedSuccessfully('Tasks'), result)
      }
    }
    catch (error) {
      sendResponse(resp, 500, internalError(), error.message)
    }
  },
}

export const { getAllTasks, getTask, createTask, updateTask, deleteTask } = tasksController