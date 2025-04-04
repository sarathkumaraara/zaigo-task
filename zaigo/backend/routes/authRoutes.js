import { Router } from "express";
import { validateUser, createUser, refreshToken, getUser } from "../controllers/authController.js";
import { validateToken } from "../utils/middleware.js";

const authRouter = Router()

authRouter.route('/login').post(validateUser)

authRouter.route('/register').post(createUser)

authRouter.route('/refresh').get(validateToken, refreshToken)

authRouter.route('/me/:id').get(validateToken, getUser)

export default authRouter