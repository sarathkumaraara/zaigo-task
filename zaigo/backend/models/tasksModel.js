import tasks from "../schemas/tasks.js";
import users from "../schemas/users.js";
class TasksModel {

  constructor() {
    this.db = tasks
    this.user = users
  }
  getAllTasks = async (page, status) => {
    try {
      const skip = page >= 1 ? (page - 1) * 10 : 0;
      const allTasks = await this.db.find({ status: status }).skip(skip).limit(10)
        .populate({ path: 'assignedTo', select: 'name _id' })
        .populate({ path: 'createdBy', select: 'name _id' })
      console.log(allTasks)
      return allTasks
    }
    catch (error) {
      throw new Error(error.message)
    }
  }

  getTaskById = async (id) => {
    try {
      const result = await this.db.findById(id)
        .populate({ path: 'assignedTo', select: 'name _id' })
        .populate({ path: 'createdBy', select: 'name _id' })
      return result
    }
    catch (error) {
      throw new Error(error.message)
    }
  }

  createTask = async (data) => {
    try {
      const result = await this.db.create(data)
      return result
    }
    catch (error) {
      throw new Error(error.message)
    }
  }
  updateTask = async (id, user_id, data) => {
    try {
      const userId = user_id
      const checkCreatedBy = await this.db.findById(id).select("createdBy").lean()
      const checkUserRole = await this.user.findById(userId).select("role").lean()
      if (checkCreatedBy?.createdBy?.toString() === userId?.toString() || checkUserRole.role === "admin") {
        const result = await this.db.findByIdAndUpdate(id, data, {
          new: true
        })
        return result
      }
      else {
        throw new Error("The Task Created or Admin person can only update the task")
      }

    }
    catch (error) {
      throw new Error(error.message)
    }
  }

  deleteTask = async (id, user_id, data) => {
    try {
      const userId = user_id
      const checkCreatedBy = await this.db.findById(id).select("createdBy").lean()
      const checkUserRole = await this.user.findById(userId).select("role").lean()
      if (checkCreatedBy?.createdBy?.toString() === userId?.toString() || checkUserRole.role === "admin") {
        const result = await this.db.findByIdAndDelete(id)
        return result
      }
      else {
        throw new Error("The Task Created or Admin person can only delete the task")
      }
    }
    catch (error) {
      throw new Error(error.message)
    }
  }
}

export default TasksModel