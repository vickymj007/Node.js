import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import mentorRoute from './Routes/mentorRoutes.js'
import studentRoute from './Routes/studentRoutes.js'

//Initializing Express Server
const app = express()

//Configuring ENV files
dotenv.config()

//Connecting to MongoDB using Mongoose
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error
    }
}


//Middlewares
app.use(express.json())
app.use('/api/mentors',mentorRoute)
app.use('/api/students',studentRoute)


//Handling Errors
app.use((err,req,res,next)=>{
    res.status(err.status||400).json({
        success:false,
        errorCode : err.status || 400,
        message:err.message|| "Something went wrong",
        stack: err.stack
    })
})


//Listening to Server
app.listen(process.env.PORT,()=>{
    console.log("Server is Listening");
    connectDB()
})