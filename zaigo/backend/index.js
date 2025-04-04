import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/mongoDbConfig.js"

import express from "express"
import cors from "cors"
import Response from "./utils/Response.js"
import authRouter from "./routes/authRoutes.js"
import tasksRouter from "./routes/taskRoutes.js"
import { validateToken } from "./utils/middleware.js"

const port = process.env.PORT = 4000


const app = express()

connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

function useRoute(path, router, token) {
  if(token){
    app.use(path,validateToken,router)
  }
  else app.use(path, router)
}

useRoute('/api/auth', authRouter);
useRoute('/api/tasks', tasksRouter);

app.get('/', (req, resp) => {
  resp.send("welcome to Task Management System")
})

app.use((req, resp) => {
  const url = req.url
  const method = req.method
  const response = new Response("Requested resource not found", `please the check the Endpoint: ${url} or Method: ${method}`)
  resp.send(response)
})


app.listen(port, () => {
  console.log(`server is running on ${port}`)
})