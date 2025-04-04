import users from "../schemas/users.js";

class AuthModel {

  constructor() {
    this.db = users
  }

  findUser = async (email) => {
    try {
      const user = await users.findOne({ email }, { password: 0 })
      return user
    }
    catch (error) {
      throw new Error(error.message)
    }
  }
  validateUser = async (email, password) => {
    const user = await users.findOne({ email })
    const isMatch = await user.comparePassword(password)
    return isMatch
  }
  
  createUser = async (data) => {
    try {
      const result = await this.db.create(data)
      if (result) return data
    }
    catch (error) {
      throw new Error(error.message)
    }
  }

  getUser = async(id) => {
    try{
      const result = await this.db.findById(id)
      .select('-password')
      .lean()
      return result
    }
    catch(error){
      throw new Error(error.message)
    }
  }
}

export default AuthModel