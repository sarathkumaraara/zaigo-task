import AuthModel from "../models/authModel.js";
import { sendResponse } from "../utils/common.js";
import jwt from 'jsonwebtoken'
import { createdSuccessfully, fetchedSuccessfully, internalError } from "../utils/responseMessageHelper.js";

const auth = new AuthModel()
const authController = {

  validateUser: async (req, resp) => {
    const { email, password } = req.body
    const user = await auth.findUser(email)
    console.log(user)
    if (!user) {
      sendResponse(resp, 404, "User Not Found", {})
    }
    else {
      const validate = await auth.validateUser(email, password)
      if (!validate) {
        sendResponse(resp, 401, "Invalid Credentials", {})
      }
      else {
        const token = jwt.sign(
          { email: email, user_id: user._id },
          process.env.SECRET_KEY,
          { expiresIn: '1d' }
        )
        const resData = {
          token: token,
          userDetails: user
        }
        sendResponse(resp, 200, "login successful", resData)
      }
    }
  },

  createUser: async (req, resp) => {
    try {
      const data = req.body
      const result = await auth.createUser(data)
      sendResponse(resp, 200, createdSuccessfully('User'), result)
    }
    catch (error) {
      sendResponse(resp, 500, internalError(), error.message)
    }
  },

  refreshToken: async (req, resp) => {
    try {
      const email = req.user
      const newToken = jwt.sign(
        { email: email, user_id: req.user_id },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      )
      const resData = {
        token: newToken,
      }
      sendResponse(resp, 200, fetchedSuccessfully('Token'), resData)
    }
    catch (error) {
      sendResponse(resp, 500, internalError(), error.message)
    }
  },

  getUser: async (req, resp) => {
    try {
      const id = req.params.id
      console.log(req)
      const result = await auth.getUser(id)
      sendResponse(resp, 200, fetchedSuccessfully('User'), result)
    }
    catch (error) {
      sendResponse(resp, 500, internalError(), error.message)
    }
  },

}

export const { validateUser, createUser, refreshToken, getUser } = authController