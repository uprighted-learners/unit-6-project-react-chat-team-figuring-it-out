//? Imports dependencies
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"


//! Importing Controllers
// import { userController, roomController, messageController } from "./controllers/index.js"


//! Importing validate session middleware function
// import validateSession from "./middleware/validate-session.js"


//? Initializing
dotenv.config()
const app = express()


//? MongoDB Connection
const MONGODB = process.env.MONGO_DB_URI + "/" + process.env.MONGO_DB_NAME
mongoose.connect(MONGODB)
const db = mongoose.connection


//! Middleware
app.use(express.json())

// app.use("/users", userController)

    //!Determine where to put validation middleware
    // app.use(validateSession)

// app.use("/rooms", roomController)
// app.use("/messages", messageController)


//? Confirming connections
db.once("open", () =>{
    console.log(`Connection successful to Database: ${process.env.MONGO_DB_NAME}`)
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on: ${process.env.PORT}`)
})