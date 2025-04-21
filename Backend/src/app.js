import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

//middleware
app.use(cors({ 
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


//configuration
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.route.js'

//routers declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register
// http://localhost:8000/api/v1/users/login
// http://localhost:8000/api/v1/users/logout

export { app }