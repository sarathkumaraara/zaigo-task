import jwt from "jsonwebtoken";
import { sendResponse } from "./common.js";

export const validateToken = (req, resp, next) => {
  const authToken = req.headers['authorization']
  if (!authToken) {
    sendResponse(resp, 401, 'Invalid Credentials')
  }
  jwt.verify(authToken, process.env.SECRET_KEY, function (error, user) {
    if (error) {
      sendResponse(resp, 403, 'Invalid Credentials')
    }
    req.user = user.email
    req.user_id = user.user_id
  })
  next();
}
